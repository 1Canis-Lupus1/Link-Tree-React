import {ADD_DATA} from './actions';

export const logUser=(user)=>{
    return{
        type: ADD_DATA,
        payload:{
            user
        }
    }
}