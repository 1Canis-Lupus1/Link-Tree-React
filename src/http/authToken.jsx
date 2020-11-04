import { store } from "../redux/store";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = null;
    const oldState = store.getState();
    const state = { ...oldState };
    if (state && state.userData && state.userData["token"]) {
      token = state.userData["token"];
    }
    resolve(token);
  });
};
