import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";

import { signIn, signOut, fetch, stopFetch } from "../actions";
import { Link } from "react-router-dom";
import history from "../history";

export default function Auth() {
  const signedIn = useSelector((state) => state.auth.isSignedIn);
  const userId = useSelector((state) => state.auth.userId);
  const [name, setName] = useState();
  const [displayName, setDN] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthChange();
  }, []);

  const onAuthChange = () => {
    dispatch(fetch());
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const displayName = user.email;
        const uid = user.uid;
        dispatch(signIn(uid));
        setDN(displayName);
        dispatch(stopFetch());
      } else {
        dispatch(stopFetch());
        history.push("/");
        // User is signed out.
        // ...
      }
    });
  };

  return (
    <div className='sign-in'>
      <div id='firebaseui-auth-container'></div>
      <div cl>{signedIn && displayName}</div>
      <div>
        {signedIn ? (
          <div
            onClick={() => {
              history.push("/");
              setDN("");

              dispatch(signOut());
            }}
          >
            Sign Out
          </div>
        ) : (
          <div>
            <a href='#login'>Sign In To Create a Watchlist</a>
          </div>
        )}
      </div>
    </div>
  );
}
