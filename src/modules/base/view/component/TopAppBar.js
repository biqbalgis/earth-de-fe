import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {Paper, Popover, withTheme} from "@material-ui/core";
import autoBind from "auto-bind";
import Tooltip from "@material-ui/core/Tooltip";
import {AccountCircle, ExitToApp} from "@material-ui/icons";
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import AccountIcon from "@material-ui/icons/AccountCircle";

import {Link, withRouter} from "react-router-dom";
import CommonUtils from "../../utils/CommonUtils";

class TopAppBar extends React.PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);

    this.state = {
      userMenuOpen: false,
      userMenuAnchorEl: null
    };
  }

  getStyle () {
    const style = {};
    style.icon = {
      // width:"32px",
      height: "32px"
    };

    style.menuButton = {
      marginRight: this.props.theme.spacing(2)
      // color: "black"
    };
    style.title = {
      // flexGrow: 1,
    };
    style.userMenu = {
      position: "absolute",
      right: 0,
      paddingRight: this.props.theme.spacing(5)
    };
    return style;
  }

  getClasses () {
    const {theme} = this.props;
    const styles = {
      root: {
        display: "flex"
      },
      appBar: {
        // height:'100px',
        // background: this.props.isTransparent ? 'transparent' : theme.palette.primary.main,
        // boxShadow: this.props.isTransparent ? 'none' : theme.shadows[4],
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
      },
      appBarShift: {
        [theme.breakpoints.up("sm")]: {
          // marginLeft: this.props.maxDrawerWidth,
          // width: `calc(100% - ${this.props.maxDrawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
          })
        }
      },
      menuButton: {
        marginRight: 36
      },
      paper: {
        backgroundColor: this.props.theme.palette.primary.light
      }
    };
    return CommonUtils.convertStyle2Classes(styles);
  }

  handleOpenUserMenu (event) {
    this.setUserMenu(event.currentTarget);
  }
  setUserMenu (anchorEl) {
    this.setState(state=>({
      userMenuAnchorEl: anchorEl
    }));
  }

  handleCloseUserMenu () {
    this.setUserMenu(null);
  }

  handleLogout (e) {
    console.log("log out...");
  }

  render () {
    // const classes = this.getClasses();
    const style = this.getStyle();
    return (
      <AppBar
        id='ui-top-appbar'
        position='fixed'
      >
        <Toolbar>
          Predly Twins Earth DE
          {this.props?.isAuthenticated ? (
            <>
              <Tooltip title={this.props.userInfo?.name || ""} aria-label='User'>
                <IconButton onClick={this.handleOpenUserMenu} aria-label='add an alarm' style={style.userMenu}>
                  {this.props.userPicture ? <img
                    src={this.props.userPicture} alt=''
                    height='40px' style={{borderRadius: "50%"}}
                  />
                    : <AccountCircle fontSize='large' />}
                </IconButton>
              </Tooltip>

              <Popover
                open={Boolean(this.state?.userMenuAnchorEl)}
                anchorEl={this.state?.userMenuAnchorEl}
                onClose={this.handleCloseUserMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <Paper>
                  <MenuItem
                    component={Link}
                    onClick={this.handleCloseUserMenu}
                    to="/app/profile/changepassword"
                  >
                    <AccountIcon /> Change Password
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    onClick={this.handleCloseUserMenu}
                    to="/logout"
                  >
                    <AccountIcon /> Log Out
                  </MenuItem>
                </Paper>
              </Popover>
            </>
          ) : (
            <Tooltip title='Sign in' aria-label='Sign in'>
              <IconButton onClick={()=> {
                this.props?.history.push("/login");
              }} style={style.userMenu}>
                <ExitToApp fontSize='large'/>
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    );
  }


}

function mapStateToProps (state) {
  return {
    userInfo: state.auth.userInfo,
    userPicture: state.auth.profilePicURL,
    isAuthenticated: state.auth.isAuthenticated
  };
}
// const mapDispatchToProps = dispatch => {
//     return {
//     // dispatching plain actions
//         setLeftDrawerOpenState: (isOpen=null) => dispatch(setLeftDrawerOpenState(isOpen))
//     };
// };
export default connect(mapStateToProps, null)(withRouter(withTheme(TopAppBar)));
