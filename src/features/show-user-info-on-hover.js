import linkifyElement from "linkifyjs/element";

import { getUserInfo } from "../libs/api";
import { monthNames } from "../libs/utils";

function init() {
  const allUsers = document.querySelectorAll("a.hnuser");
  if (allUsers.length === 0) {
    return false;
  }

  const linkifyOptions = {
    attributes: {
      rel: "noopener",
    },
  };

  for (const user of allUsers) {
    user.addEventListener("mouseover", async () => {
      let userDiv = user.parentElement.querySelector(".__rhn__hover-info");

      if (!userDiv) {
        userDiv = document.createElement("div");

        userDiv.classList.add("__rhn__hover-info", "__rhn__no-display");
        userDiv.style.left = user.getBoundingClientRect().left + "px";
        userDiv.innerHTML = `<img src=${browser.extension.getURL(
          "loader.gif"
        )}>`;

        user.parentElement.append(userDiv);

        user.dataset.rhnInfoLoaded = "0";
      }

      userDiv.classList.remove("__rhn__no-display");
      userDiv.style.left = user.getBoundingClientRect().left + "px";

      if (user.dataset.rhnInfoLoaded === "0") {
        user.dataset.rhnInfoLoaded = "1";
        const userInfo = await getUserInfo(user.innerText.split(" ")[0]);
        const userDate = new Date(userInfo.created * 1000);
        const renderedDate = `${
          monthNames[userDate.getMonth()]
        } ${userDate.getDate()}, ${userDate.getFullYear()}`;

        const table = `
					<table>
						<tbody>
							<tr>
								<td>user:</td>
								<td>${userInfo.id}</td>
							</tr>
							<tr>
								<td>created:</td>
								<td>${renderedDate}</td>
							</tr>
							<tr>
								<td>karma:</td>
								<td>${userInfo.karma}</td>
							</tr>
							${
                userInfo.about
                  ? "<tr><td>about:</td><td>" + userInfo.about + "</td></tr>"
                  : ""
              }
						</tbody>
					</table>
				`;

        userDiv.innerHTML = table;
        linkifyElement(userDiv, linkifyOptions);
      }
    });

    user.addEventListener("mouseout", () => {
      user.parentElement
        .querySelector(".__rhn__hover-info")
        .classList.add("__rhn__no-display");
    });
  }

  return true;
}

const details = {
  id: "show-user-info-on-hover",
  pages: {
    include: ["*"],
    exclude: ["/user"],
  },
  loginRequired: false,
  init,
};

export default details;
