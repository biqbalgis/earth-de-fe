import jss from "jss";
import preset from "jss-preset-default";
import clsx from "clsx";
import {AlertType, snackbarActions} from "../model/SnackbarSlice";
import {store} from "../../../static/store";



class CommonUtils {


  static showSnackbar (msg: string, alertType: any = AlertType.info) {
    store.dispatch(snackbarActions.showSnackbar({msg: msg, alertType: alertType}));
  }

  static convertStyle2Classes (styles: {}) {
    jss.setup(preset());
    const {classes} = jss.createStyleSheet(styles).attach();
    return classes;
  }

  static getContentClasses (theme: any, maxDrawerWidth: number = 240, isLeftDrawerOpen: boolean = false) {
    const styles = {
      content: {
        padding: theme.spacing(10) + 1,
        [theme.breakpoints.down("sm")]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3)
        }
      },
      contentShift: {
        [theme.breakpoints.up("sm")]: {
          marginLeft: maxDrawerWidth + 5,
          width: `calc(100% - ${maxDrawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
          })
        }

      }
    };
    const classes = CommonUtils.convertStyle2Classes(styles);
    // @ts-ignore
    return clsx(classes.content, {[classes.contentShift]: isLeftDrawerOpen});
  }

}

export default CommonUtils;
