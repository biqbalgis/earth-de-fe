import DrawingTool from "./DrawingTool";
import IconButton from "@material-ui/core/IconButton";
import {CloudDownloadOutlined} from "@material-ui/icons";
import * as React from "react";

class AOITool extends DrawingTool {
  drawingEndListener (feature) {
    console.log("AOI Tool", feature);
    console.log("geometry", feature.getGeometry().getCoordinates());
  }

  render () {
    return (
      <IconButton color='secondary' aria-label='add AOI to get Data' onClick={this.onClick}>
        <CloudDownloadOutlined />
      </IconButton>
    );
  }
}

export default AOITool;
