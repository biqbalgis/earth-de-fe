import * as React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {setAccessToken, setAuthentication, setRefreshToken, setUserInfo} from "../model/AuthSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch(setUserInfo(null));
  dispatch(setRefreshToken(null));
  dispatch(setAccessToken(null));
  dispatch(setAuthentication(false));

  history.push("/");
  return(
    <React.Fragment></React.Fragment>
  );
};

export default LogoutPage;
