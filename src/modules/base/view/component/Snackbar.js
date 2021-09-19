// import  "./style/snackbar.css";
import * as React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {connect} from "react-redux";
import {snackbarActions} from "../../model/SnackbarSlice";



function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class Snackbar extends React.PureComponent{
  componentDidMount (){
    // const {timeout} = this.props;
    // if(timeout >0 )
    //     window.setTimeout(this.props.hideSnackbar(), timeout);

  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    const {timeout} = this.props;

    if(this.props.open && timeout > 0 )
      window.setTimeout(()=>this.props.hideSnackbar(), timeout);

  }

    handleClose = () => {
      this.props.hideSnackbar();
    };

    render (){
      // const vertical = "bottom";
      // const horizontal = "right";
      // const timeout = 6000;
      const handleClose = this.handleClose;
      return(
        <React.Fragment>
          <div id="snackbar" className={this.props.open?"show":""}>
            <Alert onClose={handleClose} severity={this.props.alertType}>{this.props.msg}
            </Alert>
          </div>
        </React.Fragment>
      );
    }
}

const mapStateToProps = (state) =>{
  return state.snackbar;
};
const mapDispatchToPropsFn = (dispatch)=>{
  return {
    hideSnackbar: ()=> dispatch(snackbarActions.hideSnackbar())
  };
};
export default connect(mapStateToProps,mapDispatchToPropsFn)(Snackbar);
