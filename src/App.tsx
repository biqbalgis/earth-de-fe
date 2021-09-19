import React from "react";
// import logo from './logo.svg';
import "./static/css/App.css";
import {ThemeProvider} from "@material-ui/styles";
import {Provider} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {theme} from "./static/theme";
import {store} from "./static/store";
import BaseTemplate from "./modules/base/view/container/BaseTemplate";
import ProtectedRoute from "./modules/auth/ProtectedRoute";
import LoginPage from "./modules/auth/view/LoginPage";
import MainPage from "./modules/base/view/container/MainPage";
import LogoutPage from "./modules/auth/view/LogoutPage";
import LayerDesigner from "./modules/map/views/container/MapViewer";

function App () {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <BaseTemplate/>
            <Switch>
              <ProtectedRoute path={"/layer-designer/:uuid/"} component={LayerDesigner}/>
              <Route path={"/login"} component={LoginPage}/>
              <Route path={"/logout"} component={LogoutPage}/>
              <Route path={"/"} component={MainPage}/>
            </Switch>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
