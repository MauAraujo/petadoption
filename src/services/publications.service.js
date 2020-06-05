import * as data from "../data/publications.json";
import API from "@aws-amplify/api";

API.configure();
const apiName = "api024fb227";

export async function getPublications(filter) {
  const path = filter ? `/publications${filter}` : '/publications'
  let data = await API.get(apiName, path);
  let content = data
    .filter((obj) => obj.name)
    .map((obj) => {
      return obj;
    });
  console.log(content);
  return content;
}

export async function getPublication(publicationID) {
  try {
    let res = await API.get(
      apiName,
      "/publications/object?publicationID=" + publicationID
    );
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function uploadPublication(form) {
  return API.post(apiName, "/publications", {
    body: {
      //   publicationID: "786tyghb8t",
      publicationID: `${new Date().getTime()}`,
      content: {publicationDate: new Date(), ...form},
    },
  });
}
