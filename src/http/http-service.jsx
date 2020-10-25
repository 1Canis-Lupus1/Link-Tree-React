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
  //When We receive the token in reponse
  // if (attachToken) {
  //   try {
  //     const receivedToken = await getToken();
  //     if (receivedToken) {
  //       headers["Authorization"] = "Bearer " + receivedToken;
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
  //When we receive the token in response
  // if (attachToken) {
  //   try {
  //     const receivedToken = await getToken();
  //     if (receivedToken) {
  //       console.log(receivedToken);
  //       headers["Authorization"] = "Bearer " + receivedToken;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  return new Promise((resolve, reject) => {
    try {
      fetch(url + queryString, {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.json())
        .then((jsonResponse) => {
          if (jsonResponse.error === false) {
            // change this condition according to response structure
            resolve(jsonResponse);
          } else {
            console.log(jsonResponse);
            reject(jsonResponse);
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