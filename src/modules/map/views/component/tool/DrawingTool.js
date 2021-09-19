import AbstractTool from "./AbstractTool.tsx";
import IconButton from "@material-ui/core/IconButton";
import {CreateOutlined} from "@material-ui/icons";
import * as React from "react";
import DrawInteraction from "../interactions/Draw";

class DrawingTool extends AbstractTool {
    /**
     * initialization of tools
     */
    drawTool = null

    constructor (props) {
      super(props);
      this.drawTool = new DrawInteraction(props.MapVM);
      // this._interaction = this.drawTool?.getDraw();
      const layer = this.drawTool?.initDrawLayer("drawing layer", true);
      this._mapVM.addOverlayLayer(layer);
    }

    /**
     * for drawing on maping using draw tools
     */
    addInteractionOnMap (drawingType) {
      // if(this._drawTool.getDrawSource()){
      //     this._drawTool.getDrawSource().clear();
      //     this._olMapVM.getMap().removeInteraction(this._drawTool.getDraw());
      // }
      // this._drawingType = drawingType
      // this.addInteraction(this._interaction);
      this.drawTool?.changeDrawType(drawingType);
      // const me = this
      // this._mapVM.getMap().addInteraction(this.drawTool?.getInteraction())
      this.addInteraction(this.drawTool?.getOLInteraction());
      this.drawTool?.createHelpTooltip();
      this.drawTool?.addDrawStartListener(this.drawingStartListener);
      this.drawTool?.addDrawEndListener(this.drawingEndListener);
    }

    drawingStartListener (evt) {
      // console.log('draw started');
      const geom = evt.target;
      let output;
      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      const tooltipCoord = evt.coordinate;
    }

    drawingEndListener (feature) {
      const geom = feature.getGeometry();
      console.log("draw ended...", geom);
    }

    onClick (drawingType) {
      // const {initDrawType} = this.props;
      // console.log("initDrawType",initDrawType);
      this.addInteractionOnMap(drawingType);
      // if (!this.state.isInteractionAdded) {
      //   // this._interaction.initDrawTool()
      //   this.addInteractionOnMap(this.props?.initDrawType)
      // } else {
      //   this.removeInteractionFromMap()
      // }
      // this.setState({
      //   isInteractionAdded: !this.state.isInteractionAdded
      // })
    }

    render () {
      return (
        <IconButton color='secondary' aria-label='add an alarm' onClick={this.onClick}>
          <CreateOutlined />
        </IconButton>
      );
    }
}

export default DrawingTool;
