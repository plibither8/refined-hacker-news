const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const getUserInfo = username => {
    return fetch(`${BASE_URL}/user/${username}.json`).then(res => res.json());
};

export const getItemInfo = id => {
    return fetch(`${BASE_URL}/item/${id}.json`).then(res => res.json());
};