import React, { useState } from "react";
import firebase from "firebase/app";
import history from "../history";

import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [form, setForm] = useState("in");

  const [error, setError] = useState("");

  const [loader, setLoader] = useState(false);

  const handleUsername = (e) => {
    const username = e.target.value;
    setCredentials({ ...credentials, username: username });
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setCredentials({ ...credentials, password: password });
  };

  const handleConfirmPassword = (e) => {
    const password = e.target.value;
    setCredentials({ ...credentials, confirmPassword: password });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoader(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        credentials.username,
        credentials.password
      )
      .then(() => {
        history.push("/home");
        window.scrollTo(0, 0);
      })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
        setLoader(false);
        // ...
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoader(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.username, credentials.password)

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        setError(errorMessage);
        setLoader(false);
        // ...
      })
      .then((data) => {
        if (data) {
          history.push("/home");
          window.scrollTo(0, 0);
        }
      });
  };

  const SignUp = (
    <div>
      <h1>Sign Up to Create a Watchlist</h1>
      <form onSubmit={handleSignUp}>
        <div className='login-fields'>
          <div className='field'>
            <label>Email</label>
            <input
              onChange={handleUsername}
              value={credentials.username}
            ></input>
          </div>
          <div className='field'>
            <label>Password</label>
            <input
              type='password'
              onChange={handlePassword}
              value={credentials.password}
            ></input>
          </div>
          <div className='field'>
            <label>Confirm password</label>
            <input
              type='password'
              onChange={handleConfirmPassword}
              value={credentials.confirmPassword}
            ></input>
          </div>
        </div>
        <div className='login-button'>
          <Button
            onClick={handleSignUp}
            variant='contained'
            color='primary'
            fullWidth='true'
          >
            Submit
          </Button>
          {loader && <LinearProgress />}
        </div>
      </form>
    </div>
  );

  const SignIn = (
    <div>
      <h1>Sign In To Create a Watchlist</h1>
      <form onSubmit={handleSignIn}>
        <div className='login-fields'>
          <div className='field'>
            <label>Email</label>
            <input
              onChange={handleUsername}
              value={credentials.username}
            ></input>
          </div>
          <div className='field'>
            <label>Password</label>
            <input
              type='password'
              onChange={handlePassword}
              value={credentials.password}
            ></input>
          </div>
        </div>
        <div className='login-button'>
          <Button
            onClick={handleSignIn}
            variant='contained'
            color='primary'
            fullWidth='true'
          >
            Submit
          </Button>
          {loader && <LinearProgress />}
        </div>
      </form>
    </div>
  );

  return (
    <div className='login'>
      {form === "in" ? SignIn : SignUp}
      <div className='error'>{error}</div>
      {form === "up" && (
        <div className='in-up'>
          <p> Existing user? </p>
          <Button
            onClick={() => setForm("in")}
            variant='outlined'
            color='secondary'
            fullWidth='true'
          >
            Sign in
          </Button>
        </div>
      )}

      {form === "in" && (
        <div className='in-up'>
          <p>Don't have an account?</p>
          <Button
            onClick={() => setForm("up")}
            variant='outlined'
            color='secondary'
            fullWidth='true'
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
