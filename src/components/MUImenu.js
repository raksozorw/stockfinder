import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../actions";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='mui-menu'>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MenuIcon color='default' />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <a className='menu-link' href='#dashboard'>
            Dashboard
          </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a className='menu-link' href='#watchlist'>
            Watchlist
          </a>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(signOut());
          }}
        >
          <Link to='/' className='menu-link'>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
