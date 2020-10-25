import {makePostRequest} from './http-service';

const url = "http://139.59.14.81:4000/api/v1";

export const SignUp=data=>{
    return new Promise((resolve,reject)=>{
        makePostRequest(
            url+'/signup',
            false,
            data
        )
        .then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
            console.log("Error :",err);
        })
    })
}