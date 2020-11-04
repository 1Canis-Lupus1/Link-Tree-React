import {
  makePostRequest,
  makeGetRequest,
  makePutRequest,
  uploadUserAvatar,
} from "./http-service";

const url = "http://139.59.14.81:4000/api/v1";
const profileCloudinary = {
  preset: "ml_default",
};

export const SignUp = (signupData) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/signup", false, signupData)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const validUsername = (userName) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/check-userName", false, userName)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const Logging = (loginData) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/login", false, loginData)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const validPass = (forgot_passData) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/forgotPassword", false, forgot_passData)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const getPages = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(url + "/page", true)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const initialEntry = (createData) => {
  return new Promise((resolve, reject) => {
    makePostRequest(url + "/page", true, createData)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const createEntry = (contentData, id) => {
  return new Promise((resolve, reject) => {
    makePutRequest(url + `/page/${id}`, true, contentData)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const uploadProfilePic = (cloudData) => {
  return new Promise((resolve, reject) => {
    uploadUserAvatar(
      `https://api.cloudinary.com/v1_1/cirus/auto/upload?upload_preset=${profileCloudinary.preset}`,
      false,
      cloudData,
      `image`
    )
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("Cloudinary API call error: ", e);
        reject(e);
      });
  });
};

export const updatePic = (userData) => {
  return new Promise((resolve, reject) => {
    makePutRequest(url + "/user", true, userData)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("Cloudinary update API call error: ", e);
        reject(e);
      });
  });
};

export const getUserData = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(url + "/user", true)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.log("Cloudinary update API call error: ", e);
        reject(e);
      });
  });
};
