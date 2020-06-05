import API from "@aws-amplify/api";
import filters from "../data/filters.json";

API.configure();
const apiName = "api024fb227";

export async function getPublications() {
  let data = await API.get(apiName, "/publications");
  let content = data
    // .filter((obj) => obj.content.name)
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

export async function getPublicationsFilter(selectedFilters) {
  let publications = await getPublications();

  let arrayContains = (arr1, arr2) => {
    let contains = false;
    arr2 = arr2.map((elem2) => elem2.toLowerCase());
    arr1.forEach((elem1) => {
      if (arr2.includes(elem1.toLowerCase())) {
        contains = true;
      }
    });
    return contains;
  };

  const filter = (publication) => {
    let match = true;

    filters.forEach((filter) => {
      let key = filter.name;
      if (selectedFilters[key] && publication[key]) {
        if (Array.isArray(publication[key])) {
          let contains = arrayContains(selectedFilters[key], publication[key]);
          console.log(
            `${selectedFilters[key]} contains ${publication[key]}: ${contains}`
          );
          match = match && contains;
        } else {
          let contains = publication[key] === selectedFilters[key];
          console.log(
            `${selectedFilters[key]} === ${publication[key]}: ${contains}`
          );
          match = match && contains;
        }
      }
    });

    return match;
  };

  return publications.filter(filter);
}

export function uploadPublication(form) {
  return API.post(apiName, "/publications", {
    body: {
      //   publicationID: "786tyghb8t",
      publicationID: `${new Date().getTime()}`,
      content: { publicationDate: new Date(), ...form },
    },
  });
}
