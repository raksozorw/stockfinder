import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function MUISnackbar(props) {
  const [open, setOpen] = useState(false);
  const uid = useSelector((state) => state.auth.userId);

  useEffect(() => {
    props.alert && setOpen(true);
  }, [props.alert]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          uid
            ? `Added ${props.ticker} to watchlist.`
            : "You need to sign in to create a watchlist!"
        }
        action={
          <React.Fragment>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
