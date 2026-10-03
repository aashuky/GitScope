import axios from "axios";

const TOKEN = import.meta.env.GITHUB_TOKEN;
const HEADERS = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
export const hasToken = Boolean(TOKEN);

const githubApi = axios.create({ headers: HEADERS });

export const getUser = (login) =>
  githubApi.get(`https://api.github.com/users/${login}`).then((r) => r.data);

export const getUserRepos = (login) =>
  githubApi
    .get(`https://api.github.com/users/${login}/repos?per_page=100&sort=pushed`)
    .then((r) => r.data);

export const getUserActivity = (login) =>
  githubApi
    .get(`https://api.github.com/users/${login}/events/public?per_page=30`)
    .then((r) => r.data);

export const loadUserBundle = async (login) => {
  const [user, repos, activity] = await Promise.all([
    getUser(login),
    getUserRepos(login),
    getUserActivity(login),
  ]);
  return { user, repos, activity };};