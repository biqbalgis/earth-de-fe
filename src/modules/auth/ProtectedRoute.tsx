import React from "react";
import {useDispatch, useSelector} from "react-redux";
// import {useGoogleLogin} from 'react-google-login';
// import AuthUtils from './utils/AuthUtils';
import LoginPage from "./view/LoginPage";
import Api from "../../Api";
import {setAccessToken, setAuthentication} from "./model/AuthSlice";
// import UserUtils from "../utils/UserUtils";
//
// import LoginPage from "../modules/base/LoginPage";


let ProtectedRoute: (props: any) => any;
ProtectedRoute = (props: any) => {
  const Component: any = props.component;
  const {params}: any = props.computedMatch;
  const isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);
  // console.log("isAuthenticated", isAuthenticated);
  // const userInfo : any = useSelector((state: any) => state.auth.userInfo);
  // console.log("userInfo", userInfo);
  const dispatch = useDispatch();
  // if(!isAuthenticated)
  Api.getAccessToken().then((response: any) => {
    // console.log("access token", response);
    if(response) {
      dispatch(setAccessToken(response));
      dispatch(setAuthentication(true));
    }
  });

  return(isAuthenticated ? <Component params={params} /> : <LoginPage />);
};
export default ProtectedRoute;
