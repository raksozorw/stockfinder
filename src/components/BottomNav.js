import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";

import MUISnackBar from "./MUISnackBar";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "black",
    color: "white",
    borderTopStyle: "solid",
    borderWidth: "3px",
  },
});

export default function BottomNav(props) {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(false);

  return (
    <div>
      <BottomNavigation showLabels className={classes.root}>
        <BottomNavigationAction
          label='Add to Watchlist'
          icon={<FavoriteIcon />}
          onClick={() => {
            props.firebaseSubmit();
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
          }}
        />
        <BottomNavigationAction
          label='Refresh Data'
          onClick={() => props.refresh()}
          icon={<RestoreIcon />}
        />
      </BottomNavigation>
      <MUISnackBar alert={alert} ticker={props.ticker} />
    </div>
  );
}
