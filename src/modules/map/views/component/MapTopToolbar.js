import * as React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AOITool from "./tool/AOITool";
import {makeStyles} from "@material-ui/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";

const ToolbarStyle = {
//  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "5px",
  minHeight: "40px",
  width: "200px",
  position: "absolute",
  top: "10px",
  left: "80px",
  padding: "0",
  margin: "0",
  zIndex: 1000
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: fade(theme.palette.primary.light,0.5),
    color: theme.palette.primary.contrastText,
    borderRadius: "25px",
    minHeight: "40px",
    width: "400px",
    position: "absolute",
    top: "10px",
    left: "80px",
    padding: "0",
    margin: "0",
    zIndex: 1000,
    ...theme.mixins.toolbar
  }
}));
const MapTopToolbar = (props) => {
  const classes = useStyles();
  // const theme = useTheme();
  // eslint-disable-next-line react/prop-types
  const {MapVM} = props;
  return (
    <>
      <Toolbar className={classes.toolbar}>
        <AOITool initDrawType={2} MapVM={MapVM} />
      </Toolbar>
    </>

  );
};

export default MapTopToolbar;
