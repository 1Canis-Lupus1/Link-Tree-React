import {
  makePostRequest,
  makeGetRequest
} from "./http-service";

const url = "http://139.59.14.81:4000/api/v1";

export const SignUp = (data) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/signup", false, data)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
        console.log("Error: ", err);
      });
  });
};

export const validUsername = (userName) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/check-userName", false, userName)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
          reject(err);
          console.log("Error: ", err);
      });
  });
};

export const Logging = (data) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/login", false, data)
      .then((response) => {
        resolve(response);
        console.log("Token Response:",response);
      })
      .catch((err) => {
        console.log("Error: ", err);
        reject(err);
      });
  });
};