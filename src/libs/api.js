const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export function getUserInfo(username) {
	return fetch(`${BASE_URL}/user/${username}.json`).then(res => res.json());
}

export function getItemInfo(id) {
	return fetch(`${BASE_URL}/item/${id}.json`).then(res => res.json());
}
