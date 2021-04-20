import { format } from "timeago.js";

import { getUrlParams } from "../libs/utils";

function navbarLink() {
  const navbar = document.querySelector("span.pagetop");
  if (!navbar) {
    return false;
  }

  const submitLink = navbar.querySelector('a[href="submit"]');
  if (!submitLink) {
    return false;
  }

  const pollsLink = document.createElement("a");
  const separator = document.createTextNode(" | ");

  pollsLink.innerText = "polls";
  pollsLink.href = "/#polls";

  navbar.insertBefore(pollsLink, submitLink);
  navbar.insertBefore(separator, submitLink);

  return pollsLink;
}

async function getPollItems(page) {
  const order = getUrlParams("order") === "score" ? "score" : undefined;

  const rawResults = await fetch(
    `https://hn.algolia.com/api/v1/${
      order ? "search" : "search_by_date"
    }?tags=poll&page=${page}&hitsPerPage=30`
  )
    .then((res) => res.json())
    .then((obj) => obj.hits);

  const results = [];
  for (const result of rawResults) {
    results.push({
      id: result.objectID,
      author: result.author,
      comments:
        result.num_comments +
        " comment" +
        (result.num_comments === 1 ? "" : "s"),
      points: result.points + " point" + (result.points === 1 ? "" : "s"),
      title: result.title,
      date: format(result.created_at),
    });
  }

  return results;
}

async function setPollItems() {
  const itemlistTable = document.querySelector("table.itemlist > tbody");
  const stories = itemlistTable.querySelectorAll(":scope > tr");
  const [moreSpace, moreButton] = [...stories].slice(-2);

  for (const row of stories) {
    row.remove();
  }

  const pageNumber = Number(getUrlParams("p"));
  const realPageNumber = pageNumber === 0 ? 1 : pageNumber;

  const order = getUrlParams("order") === "score" ? "score" : undefined;
  const orderUrl = `/?p=${realPageNumber}${order ? "" : "&order=score"}#polls`;
  itemlistTable.innerHTML = `
		<tr style="height:6px"></tr>
		<tr>
			<td colspan="2"></td>
			<td>
			Polls are listed in ${
        order ? "order of 'most points'" : "reverse chronological order"
      }.
			<a href='${orderUrl}'><u>Order by ${order ? "date" : "score"}</u>.</a>
			<br>You can also <a href="/newpoll"><u>create a new poll</u></a>.
			</td>
		</tr>
		<tr style="height:12px"></tr>
	`;

  const items = await getPollItems(realPageNumber - 1);
  items.forEach((item, index) => {
    itemlistTable.innerHTML += `
			<tr class='athing' id='${item.id}'>
				<td align="right" valign="top" class="title">
					<span class="rank">${(realPageNumber - 1) * 30 + index + 1}.</span>
				</td>
				<td valign="top" class="votelinks nosee">
					<center>
							<div class="votearrow" title="upvote"></div>
						</a>
					</center>
				</td>
				<td class="title">
					<a href="item?id=${item.id}" class="storylink">${item.title}</a>
				</td>
			</tr>
			<tr>
				<td colspan="2"></td>
				<td class="subtext">
					<span class="score" id="score_${item.id}">${item.points}</span>
					by
					<a href="user?id=${item.author}" class="hnuser">${item.author}</a>
					<span class="age"><a href="item?id=${item.id}">${item.date}</a></span>
					|
					<a href="https://hn.algolia.com/?query=${encodeURI(
            item.title
          )}&sort=byDate&dateRange=all&type=poll&storyText=false&prefix&page=0" class="hnpast">past</a>
					|
					<a href="https://www.google.com/search?q=${encodeURI(item.title)}">web</a>
					|
					<a href="item?id=${item.id}">${item.comments}</a>
				</td>
			</tr>
			<tr class="spacer" style="height:5px"></tr>
		`;
  });

  moreButton.querySelector("a").href = `/?p=${realPageNumber + 1}#polls`;
  itemlistTable.append(moreSpace, moreButton);

  document.title = "Polls | Hacker News";
}

async function init(metadata) {
  const pollsLink = navbarLink();

  if (metadata.path === "/") {
    if (window.location.hash === "#polls") {
      pollsLink.style.color = "#ffffff";
      await setPollItems();
    } else {
      window.addEventListener("hashchange", () => {
        if (window.location.hash === "#polls") {
          window.location.reload();
        }
      });
    }
  }

  return Boolean(pollsLink);
}

const details = {
  id: "list-hn-polls-separately",
  pages: {
    include: ["*"],
    exclude: [],
  },
  loginRequired: false,
  awaitInit: true,
  init,
};

export default details;
