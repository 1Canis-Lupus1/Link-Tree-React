// import { getToken } from "./authToken";
import {store} from '../redux/store';
import {
  makePostRequest,
  makeGetRequest,
  makePutRequest
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
          console.log("Error in /check-userName:", err);
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
        console.log("Error in /login :", err);
        reject(err);
      });
  });
};

export const validPass=(mail)=>{
  return new Promise((resolve,reject)=>{
    makePostRequest(url+"/forgotPassword",false,mail)
    .then((response)=>{
      resolve(response);
      console.log("Forgot Password:",response);
    })
    .catch((err)=>{
      console.log("Error in /forgotPassword :",err);
    })
  })
}

export const getPages=()=>{
  return new Promise((resolve,reject)=>{
    makeGetRequest(url+"/page",true)
    .then((res)=>{
      resolve(res);
      console.log("Get Pages by token:",res);
    })
    // .then((resp=>console.log("GET Pages by token:",resp)))
    .catch(err=>{
      //error here
      console.log("Error in GET /page :",err);
      reject(err);
    })
  })
}

export const createEntry = (entryData, id) => {
  return new Promise((resolve, reject) => {
    makePutRequest(url + `/page/${id}`, true, entryData)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log("Error in createEntry: ", err);
        reject(err);
      });
  });
};

export const initialEntry = (entryData) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/page", true, entryData)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
        console.log("Error in initialEntry: ", err);
      });
  });
};
