import * as types from "./types";

const baseUrl = "https://hn.algolia.com/api/v1";

const instance = (path: string) => () => fetch(`${baseUrl}${path}`);

const getSearchPath = ({
  keyword,
  tags,
  numericFilters,
  page,
}: types.SearchParams) => {
  const params: types.Map = {
    page,
    ...(keyword && { query: keyword }),
    ...(tags && { tags: tags.join(",") }),
    ...(numericFilters && { numericFilters }),
  };
  const qs = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return `/search?${qs}`;
};

export const getSearchByDatePath = ({
  keyword,
  tags,
  numericFilters,
  page,
}: types.SearchParams) => {
  const params: types.Map = {
    page,
    ...(keyword && { query: keyword }),
    ...(tags && { tags: tags.join(",") }),
    ...(numericFilters && { numericFilters }),
  };
  const qs = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return `${baseUrl}/search_by_date?${qs}`;
};

export const getSearchInstance = (params: types.SearchParams) =>
  instance(getSearchPath(params));

const getRecentPopularStoryListEndpointPath = (page: number) => {
  const last24hrs = Math.ceil(Date.now() / 1000 - 24 * 60 * 60);

  return getSearchPath({
    tags: ["story"],
    numericFilters: `created_at_i>=${last24hrs}`,
    page,
  });
};

export const getRecentPopularStoryListInstance = (page: number) =>
  instance(getRecentPopularStoryListEndpointPath(page));

const getUserProfilePath = (username: string) => {
  return `${baseUrl}/users/${username}`;
};

export const getUserProfileInstance = (username: string) =>
  instance(getUserProfilePath(username));
