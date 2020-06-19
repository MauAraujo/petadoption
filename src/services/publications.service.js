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

    Object.keys(selectedFilters).forEach((filter) => {
      let key = filter;
      console.log(key)
      if (selectedFilters[key] && publication[key]) {
        if (Array.isArray(publication[key])) {
          let contains = arrayContains(selectedFilters[key], publication[key]);
          console.log(
            `${selectedFilters[key]} contains ${publication[key]}: ${contains}`
          );
          match = match && contains;
        } else {
          let contains = publication[key] === selectedFilters[key];
          if (key === "age") {
            console.log("min", publication[key] >= (selectedFilters[key]["min"]))
            console.log("max", publication[key]<(selectedFilters[key]["max"]))
            contains =
              publication[key] >= (selectedFilters[key]["min"] || 0) &&
              publication[key] <= (selectedFilters[key]["max"] || 99);
            console.log(selectedFilters[key])  
          }
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

export function uploadPublication(data) {
  return API.post(apiName, "/publications", {
    body: {
      //   publicationID: "786tyghb8t",
      publicationID: `${new Date().getTime()}`,
      content: { publicationDate: new Date(), ...data },
    },
  });
}

export function updatePublication(publicationID , data){
  console.log("update", publicationID)
  return API.post(apiName, "/publications", {
    body: {
      publicationID: publicationID,
      content: data
    }
  }).then(msg => console.log(msg)).catch(err => console.error("Error en update", err))
}

export async function removePublication(publicationID) {
    try {
        let res = await API.del(
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
