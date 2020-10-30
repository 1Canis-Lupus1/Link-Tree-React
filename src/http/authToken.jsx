// import {userReducer} from '../redux/reducer/user-reducer';
// import {connect} from 'react-redux';
import { store } from "../redux/store";

export const getToken = () => {
  return new Promise((resolve) => {
    let authToken = null;
    const prevState = store.getState();
    const state = { ...prevState };
    console.log("CHECKING STORE:", state);
    if (state && state.userData && state.userData["token"]) {
      authToken = state.userData["token"];
    }
    resolve(authToken);

    localStorage.setItem("username", state.userData.userName);
    //   let uName = null;
    //   if (state && state.userData && state.userData.userName) {
    //     uName = state.userData.userName;
    //     console.log("UNAME:", uName);
    //   }
    //   resolve(uName);
    //   // console.log("In GetToken:", authToken);
  });
};

// const mapStateToProps=(state)=>{
//     return{
//         authToken:state.userData
//     }
// }

// export default connect(mapStateToProps)(getToken)
