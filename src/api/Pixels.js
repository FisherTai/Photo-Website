const auth = "563492ad6f91700001000001647b4227b11544b1885d32353a50aba8";
const domain = "https://api.pexels.com/v1";
const initUrl = `${domain}/curated?page=1&per_page=15`;
let nextPageUrl = "";

const getDefaultPictures = async () => {
  return await search(initUrl);
};

const getSearchPictures = async (searchWord) => {
  return await search(
    `${domain}/search?query=${searchWord}&per_page=15&page=1`
  );
};

const getMorePictures = async () => {
  return get(nextPageUrl);
};

const search = async (url) => {
  return get(url);
};

const get = async (url) => {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const dataResult = await dataFetch.json();
  nextPageUrl = dataResult.next_page;
  return dataResult.photos;
};

const Pexels = {
  getDefaultPictures,
  getSearchPictures,
  getMorePictures,
  search
};

export default Pexels;
