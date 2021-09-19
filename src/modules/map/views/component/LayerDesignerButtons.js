import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Inbox, Mail} from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";


const useStyles = makeStyles((theme) => ({
  paper: {
    height : "100%",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
}));

const LayerDesignerButtons = (props) => {
  const {open}= props;
  const classes= useStyles();
  // const  matches = useMediaQuery(theme => theme.breakpoints.up("md"));

  const buttonNameList = ["All mail", "Trash", "Spam"];
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit timeout={0}>
      <Paper
        variant="elevation"
        elevation={6}
        className={classes.paper}
      >
        <Divider />
        <List>
          {buttonNameList?.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Slide>
  );
};

export default LayerDesignerButtons;
