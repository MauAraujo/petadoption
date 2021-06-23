const axios = require('axios');
const api = 'http://127.0.0.1:7700';

export async function getArticle(articleID) {
    const response = await axios.get(`${api}/indexes/pet-articles/documents/${articleID}`)
          .catch(err => console.log(err));
    return response.data;
}
