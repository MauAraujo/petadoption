const axios = require("axios");

export async function getArticle(articleID) {
  const searchURL = process.env.REACT_APP_MEILISEARCH_URL;
  const response = await axios
    .get(`${searchURL}/indexes/pet-articles/documents/${articleID}`)
    .catch((err) => console.log(err));
  return response.data;
}
