import { Route, Redirect } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";

const PublicRoute = ({component: Component, ...rest}) => {
  const data = useSelector(state => state)
  // console.log("useselectore",data)
  return ( 
    <Route {...rest} render={props=>{
       // change the token name accorfing to project
      if(data.userData.isActive){
        return <Redirect to={{pathname: rest.redirectRoute, extras: {...rest.location}}} />
      }else{
        return <Component {...props}/> 
      }
    }} />
   );
}

export default PublicRoute;