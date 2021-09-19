import React from "react";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  withTheme
} from "@material-ui/core";
import CommonUtils from "../../../base/utils/CommonUtils";
import {withRouter} from "react-router-dom";
import Api, {APIs} from "../../../../Api";
import MenuIcon from "@material-ui/icons/Menu";
import autoBind from "auto-bind";
import MapVM, {mapStyle} from "../../utils/MapVM";
import LayerDesignerButtons from "../component/LayerDesignerButtons";
import MapTopToolbar from "../component/MapTopToolbar";


class MapViewer extends React.Component{
  layerDesignerMap = new MapVM();
  containerRef = React.createRef();
  constructor (props) {
    super(props);
    autoBind(this);
    this.state = {
      layerInfo: null,
      open:false
    };
  }
  componentDidMount () {
    this.layerDesignerMap.initMap("map-div");
    setTimeout(()=> this.handleDrawerOpen(true), 400);
  }


  getStyle (){
    const {theme} = this.props;
    const drawerWidth = 250;
    const height = 500;
    return {
      root: {
        display: "flex"
      },
      gridItem: {
        height:height
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.dark,
        height: "75px"
      },
      title: {
        flexGrow: 1
      },
      hide: {
        display: "none"
      },
      toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
      },
      drawer: {
        width: drawerWidth,
        height: height,
        flexShrink: 0
      },
      drawerClose: {
        width: 0,
        height: 0
      },
      mapItemFull: {
        width: "100%",
        height: height,
        // padding: theme.spacing(3),
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })

      },
      mapItemShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        height: height,
        // padding: theme.spacing(3),
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    };
  }

  handleDrawerOpen (open = null){
    open = open ? open : !this.state.open;
    this.setState( {
      open : open
    });
  }

  render (){
    const classes = CommonUtils.convertStyle2Classes(this.getStyle());
    const {open} = this.state;
    return(
      <Container ref={this.containerRef}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              {this.state.layerInfo?.title} Map
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={()=>this.handleDrawerOpen(null)}
              edge="start"
            >as
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>


        <Grid container direction="row" >
          <Grid item className={classes.mapItemFull}>
            <div id={"map-div"} style={mapStyle}>
              <MapTopToolbar MapVM={this.layerDesignerMap} />
            </div>
          </Grid>
          <Grid item className={open ?  classes.drawer : classes.drawerClose}>
            <LayerDesignerButtons open={open} />
          </Grid>
        </Grid>

      </Container>

    );
  }
}
export default  withTheme(withRouter(MapViewer));
