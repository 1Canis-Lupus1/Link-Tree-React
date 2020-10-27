// import {userReducer} from '../redux/reducer/user-reducer';
// import {connect} from 'react-redux';
import {store} from '../redux/store';

export const getToken=()=>{ 
    return new Promise((resolve, reject) => {
      let authToken = null;
      const prevState = store.getState();
      const state = { ...prevState };

      if (state && state.userData && state.userData["token"]) {
        authToken = state.userData["token"];
      }
      resolve(authToken);
      console.log("In GetToken:", authToken);
    });
}

// const mapStateToProps=(state)=>{
//     return{
//         authToken:state.userData
//     }
// }

// export default connect(mapStateToProps)(getToken)