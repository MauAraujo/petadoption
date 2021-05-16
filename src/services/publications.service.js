const axios = require('axios');

const api = 'http://127.0.0.1:8080';

export async function getPublications(filter) {
    //const path = filter ? `/publications${filter}` : '/publications';
    const response = await axios.get(api + '/publications').catch(err => {
        console.log(err);
    });
    return response.data;
}

export async function getPublication(publicationID) {
    const data = await axios.get(api + `/publications?id=${publicationID}`).catch(err => {
        console.log(err);
    });
    console.log(data);
    return data;
}

// export async function getPublicationsFilter(selectedFilters) {
//   let publications = await getPublications();

//   let arrayContains = (arr1, arr2) => {
//     let contains = false;
//     arr2 = arr2.map((elem2) => elem2.toLowerCase());
//     arr1.forEach((elem1) => {
//       if (arr2.includes(elem1.toLowerCase())) {
//         contains = true;
//       }
//     });
//     return contains;
//   };

//   const filter = (publication) => {
//     let match = true;

//     Object.keys(selectedFilters).forEach((filter) => {
//       let key = filter;
//       console.log(key)
//       if (selectedFilters[key] && publication[key]) {
//         if (Array.isArray(publication[key])) {
//           let contains = arrayContains(selectedFilters[key], publication[key]);
//           console.log(
//             `${selectedFilters[key]} contains ${publication[key]}: ${contains}`
//           );
//           match = match && contains;
//         } else {
//           let contains = publication[key] === selectedFilters[key];
//           if (key === "age") {
//             console.log("min", publication[key] >= (selectedFilters[key]["min"]))
//             console.log("max", publication[key]<(selectedFilters[key]["max"]))
//             contains =
//               publication[key] >= (selectedFilters[key]["min"] || 0) &&
//               publication[key] <= (selectedFilters[key]["max"] || 99);
//             console.log(selectedFilters[key])  
//           }
//           console.log(
//             `${selectedFilters[key]} === ${publication[key]}: ${contains}`
//           );
//           match = match && contains;
//         }
//       }
//     });

//     return match;
//   };

//   return publications.filter(filter);
// }

export function uploadPublication(data) {
  data.date = new Date();
  return axios.post(api + "/publications", data);
}

// export function updatePublication(publicationID , data){
//   console.log("update", publicationID)
//   return API.post(apiName, "/publications", {
//     body: {
//       publicationID: publicationID,
//       content: data
//     }
//   }).then(msg => console.log(msg)).catch(err => console.error("Error en update", err))
// }

// export async function removePublication(publicationID) {
//     try {
//         let res = await API.del(
//             apiName,
//             "/publications/object?publicationID=" + publicationID
//         );
//         console.log(res);
//         return res;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }
