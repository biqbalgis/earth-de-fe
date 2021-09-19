import React from "react";
import autoBind from "auto-bind";
import MapVM from "../../../utils/MapVM";
import GestureIcon from "@material-ui/icons/Gesture";
interface ToolProps {
    MapVM : MapVM
}
interface ToolState {
    isInteractionAdded: boolean
}
class AbstractTool extends React.Component<ToolProps, ToolState>{
    _mapVM : any = null
    constructor (props: any) {
      super(props);
      this._mapVM = props.MapVM;
      autoBind(this);
      this.state = {
        isInteractionAdded: false
      };
    }

    getOLMapVM () {
      return this._mapVM;
    }

    initTool () {

    }



    // clearAll () {
    //
    // }
    getOLMap () {
      if (this._mapVM)
        return this._mapVM.getMap();

      return null;
    }

    onClick () {
      alert("working...");
    }

    addInteraction (interaction: any) {
      if(interaction) {
        this._mapVM.removeAllCustomInteraction();
        this._mapVM.addCustomInteraction(interaction);
      }
    }

    /**
     * to removing interaction so user can use other interaction
     */
    removeInteractionFromMap () {
      // if(this.drawTool) {
      // this._interaction.getDrawSource().clear()
      // this._interaction.removeAllOverlays()
      // this._mapVM.getMap().removeInteraction(this._interaction.getDraw())
      // this._mapVM.removeInteraction()
      // }
    }

    render () {
      return (
        <GestureIcon />
      );
    }
}

export default AbstractTool;
