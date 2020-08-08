import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import Auth from "./Auth";
import SimpleMenu from "./MUImenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const signedIn = useSelector((state) => state.auth.isSignedIn);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='primary'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            {signedIn && <SimpleMenu />}
          </IconButton>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            Stock Finder
          </IconButton>
          <Typography variant='h6' className={classes.title}></Typography>
          <Button color='inherit'>
            <Auth />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
