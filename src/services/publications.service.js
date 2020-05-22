import * as data from "../data/publications.json";
import API from "@aws-amplify/api";

API.configure();
const apiName = "api024fb227";

export async function getPublications() {
  let data = await API.get(apiName, "/publications");
  let content = data
    .filter((obj) => obj.content.name)
    .map((obj) => {
      return { publicationID: obj.publicationID, ...obj.content };
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
      content: form,
    },
  });
}
