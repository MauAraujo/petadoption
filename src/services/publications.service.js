import { MeiliSearch } from 'meilisearch'

const axios = require('axios');

const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700'
})

const api = 'http://127.0.0.1:8082';

export async function getPublications(filter) {
  //const path = filter ? `/publications${filter}` : '/publications';
  var response = await axios.get(api + '/publications').catch(err => {
    console.log(err);
  });
  if (typeof response === "undefined") {
    response = {}
    response.data = [];
  }
  return response.data;
}

export async function getPublication(publicationID) {
  const response = await axios.get(api + `/publications/${publicationID}`).catch(err => {
    console.log(err);
  });
  return response.data;
}

export async function uploadPublication(data) {
  data.date = new Date();
  const response = await axios.post(api + "/publications", data).catch(err => {
    console.log(err);
  });
  data.id = response.data.InsertedID
  console.log(data)
  await client.index('pet-adoption').addDocuments([data])
    .catch(err => console.log(err))
  return response;
}

export async function updatePublication(publicationID, data) {
  const response = await axios.put(api + `/publications/${publicationID}`, data).catch(err => {
    console.log(err);
  });
  data.id = response.data.InsertedID
  console.log(data)
  await client.index('pet-adoption').addDocuments([data])
    .catch(err => console.log(err))
  return response;
}

export async function removePublication(publicationID) {
  const response = axios.delete(api + `/publications/${publicationID}`).catch(err => {
    console.log(err);
  });
  await client.index('pet-adoption').deleteDocument(publicationID)
    .catch(err => console.log(err))
  return response;
}
