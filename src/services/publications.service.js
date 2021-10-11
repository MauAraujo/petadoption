import { MeiliSearch } from 'meilisearch'
import {
  puppy_nutrition,
  adult_dog_nutrition,
  senior_dog_nutrition,
  brachycephalic_nutrition,
  dental_disease_nutrition,
  obesity_nutrition,
  skin_problem_nutrition,
  kitten_nutrition,
  adult_cat_nutrition,
  senior_cat_nutrition,
  cat_general_nutrition,
  general_dog_nutrition_statement,
  general_cat_nutrition_statement
} from '../data/pet_info'

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

export async function getRecommendations(animal, age, breed) {
  var image, recommendations
  if (animal === 'dog') {
    let img = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
    image = img.data.message
    let response = await axios.get(api + `/recommendations/${age}/${breed}`).catch(err => {
      console.log(err);
    });
    recommendations = getDogRecommendations(age, response.data)
  } else {
    let r = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${breed}&api_key=4e4b1f99-d8d0-4e93-a41f-e2b8c5a7b895`)
    let id = r.data[0].id
    let img = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${id}&api_key=4e4b1f99-d8d0-4e93-a41f-e2b8c5a7b895`)
    image = img.data[0].url
    let response = await axios.get(api + `/recommendations/${age}/${id}`).catch(err => {
      console.log(err);
    });
    recommendations = getCatRecommendations(age, response.data)
  }

  return { image: image, recommendations: recommendations }
}

function getDogRecommendations(age, dog) {
  var recommendations = []
  recommendations.push(general_dog_nutrition_statement)
  if (age === "baby") {
    recommendations.push(puppy_nutrition)
  }
  else if (age === "adult") {
    recommendations.push(adult_dog_nutrition)
  }
  else if (age === "senior") {
    recommendations.push(senior_dog_nutrition)
  }

  if (dog["brachycephalic"])
    recommendations.push(brachycephalic_nutrition)
  if (dog["sensitive_stomach"])
    recommendations.push(dental_disease_nutrition)
  if (dog["obesity_prone"])
    recommendations.push(obesity_nutrition)
  if (dog["dental_disease_prone"])
    recommendations.push(dental_disease_nutrition)
  if (dog["skin_problem_prone"])
    recommendations.push(skin_problem_nutrition)

  return recommendations
}

function getCatRecommendations(age, cat) {
  var recommendations = []
  recommendations.push(general_cat_nutrition_statement)
  if (age === "baby")
    recommendations.push(kitten_nutrition)
  else if (age === "adult")
    recommendations.push(adult_cat_nutrition)
  else if (age === "senior")
    recommendations.push(senior_cat_nutrition)

  if (cat["recommendation"])
    recommendations.push(cat["recommendation"])
  else
    recommendations.push(cat_general_nutrition)

  return recommendations
}