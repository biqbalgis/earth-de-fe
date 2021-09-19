import React from "react";
import {Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, withStyles} from "@material-ui/core";
import {Face, Fingerprint} from "@material-ui/icons";
import Api from "../../../Api";
import autoBind from "auto-bind";
import {setAccessToken, setAuthentication, setRefreshToken, setUserInfo} from "../model/AuthSlice";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import CommonUtils from "../../base/utils/CommonUtils";

const styles = theme => ({
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(2)
  }
});

class LoginPage extends React.Component {
  constructor (props) {
    super(props);
    autoBind(this);
    this.state = {
      username: "",
      password: "",
      isError: false
    };
    // this.unRef = React.createRef();
    // this.passRef = React.createRef();
  }

  handleUserNameChange (e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange (e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin () {
    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    Api.authenticate(formData).then((response) => {
      console.log("authentication result", response);
      if (response.status ===  "failed"){
        CommonUtils.showSnackbar("Failed to login. Please check your username or password");
        this.setState({isError: true});
      }
      else {
        this.props.setAuthentication(true);
        this.props.setUserInfo(response?.userInfo);
        this.props.setRefreshToken(response?.refresh);
        this.props.setAccessToken(response?.access);
        this.setState({isError: false});
      }
    });
  }

  render () {
    const {classes} = this.props;
    const {isError} = this.state;
    // console.log("history", this.props);
    if (this.props.isAuthenticated && this.props.location.pathname === "/login")
      this.props.history.push("/");

    return (
      <Container maxWidth={"md"}>
        <Paper className={classes.padding}>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Face/>
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField value={this.state.username} onChange={this.handleUserNameChange} label="Username"
                  type="email" fullWidth autoFocus required/>
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Fingerprint/>
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField value={this.state.password} onChange={this.handlePasswordChange} label="Password"
                  type="password" fullWidth required/>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <FormControlLabel control={
                  <Checkbox
                    color="primary"
                  />
                } label="Remember me"/>
              </Grid>
              <Grid item>
                <Button disableFocusRipple disableRipple style={{textTransform: "none"}} variant="text"
                  color="primary">Forgot password ?</Button>
              </Grid>
            </Grid>
            <div style={{backgroundColor: "red"}}>{isError ? "Invalid Credentials" : ""}
            </div>
            <Grid container justify="center" style={{marginTop: "10px"}}>
              <Button variant="outlined" color="primary" style={{textTransform: "none"}}
                onClick={this.handleLogin}
              >Login</Button>
            </Grid>
          </div>
        </Paper>
      </Container>
    );
  }
}

const mapState2Props = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapDispatch2Props = (dispatch) => {
  return {
    setUserInfo: (userInfo) => {
      dispatch(setUserInfo(userInfo));
    },
    setRefreshToken: (refreshToken) => {
      dispatch(setRefreshToken(refreshToken));
    },
    setAccessToken: (accessToken) => {
      dispatch(setAccessToken(accessToken));
    },
    setAuthentication: (isAuthticated) => {
      dispatch(setAuthentication(isAuthticated));
    }
  };
};
export default connect(mapState2Props, mapDispatch2Props)(withRouter(withStyles(styles)(LoginPage)));
