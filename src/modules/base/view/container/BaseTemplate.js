import * as React from "react";
import CommonUtils from "../../utils/CommonUtils";
import {CssBaseline, Snackbar, withTheme} from "@material-ui/core";
import TopAppBar from "../component/TopAppBar";

class BaseTemplate extends React.Component {
  constructor (props) {
    super(props);
    if (this.props.isAuthenticationRequired)  this.getUserInfo();
  }

  getClasses () {
    const {theme} = this.props;
    const styles = {
      root: {
        display: "flex"
      },
      hide: {
        display: "none"
      },
      content: {
        flexGrow: 1,
        paddingTop: theme.spacing(9) + 1
      }
    };
    return CommonUtils.convertStyle2Classes(styles);
  }

  render () {
    const classes = this.getClasses();
    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <TopAppBar loggedIn={this.props.loggedIn} />

          <Snackbar id='alert-box' />
          {/* <DialogBox /> */}
        </div>
      </>
    );
  }
}

export default withTheme(BaseTemplate);
