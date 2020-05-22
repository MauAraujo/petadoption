import * as data from "../data/publications.json";
import API from "@aws-amplify/api";

API.configure();
const apiName = "api024fb227";

export async function getPublications() {
  //    let res = await API.get(apiName, '/publications')
  //     console.log(res)

  console.log(data.default);
  // data.forEach(publication => {
  //     console.log(publication.name)
  // })
  return data.default;
}

export async function getPublication(publicationID) {
  try {
    let res = await API.get(apiName, "/publications/object?publicationID=" + publicationID);
    console.log(res)
    return res
  } catch(error){
    console.error(error)
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
