import { getToken } from "./authToken";
// import {connect} from 'react-redux';

const queryParams = (params) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

export const makePostRequest = async (
  url,
  attachToken = false,
  params = {}
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // if (attachToken) {
  //   try {
  //     const authToken = await getToken();
  //     if (authToken) {
  //       headers["Authorization"] = "Bearer " + authToken;
  //     }
  //   } catch (e) {
  //     console.log("Error fetching auth token: ", e);
  //   }
  // }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then(
          (res) => res.json(),
          (error) => {
            reject(error);
          }
        )
        .then(
          (jsonResponse) => {
            if (jsonResponse.error === false) {
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makeGetRequest = async (
  url,
  attachToken = false,
  params = null
) => {
  let queryString = "";
  if (params) {
    queryString = queryParams(params);
  }
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      // console.log("MY TOKEN IS:",authToken)
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url + queryString, {
        method: "GET",
        headers: headers,
      })
        //trying res.text()
        .then((res) => res.json())
        .then((jsonResponse) => {
          if (jsonResponse.error === false) {
            resolve(jsonResponse);
            console.log("JSON RESPONSE:", jsonResponse);
          } else {
            reject(jsonResponse);
            console.log("JSON RESPONSE:", jsonResponse);
          }
        })
        .catch((e) => {
          console.log("XHR GET Error: ", e);
          reject(e);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makePutRequest = async (url, attachToken = false, params = {}) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("Error fetching auth token: ", e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then(
          (res) => res.json(),
          (error) => {
            reject(error);
          }
        )
        .then(
          (jsonResponse) => {
            if (jsonResponse.error === false) {
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};
