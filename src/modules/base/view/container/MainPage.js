import React, {useState} from "react";
import {Container, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import MapViewer from "../../../map/views/container/MapViewer";

const MainPage = () => {
  const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
  const userInfo = useSelector((state) => state?.auth.userInfo);
  // console.log("userInfo", userInfo);

  return (
    <Container>
      {/*<div> {isAuthenticated ? <div> {userInfo?.name}</div> :*/}
      {/*  <div>Please login to get access of application</div>}*/}
      {/*</div>*/}
      {isAuthenticated ?
        <div>
          <MapViewer/>
        </div> : <div> Please login to get access of application </div>}
    </Container>
  );
};

export default MainPage;
