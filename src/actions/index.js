import {
  SIGN_IN,
  SIGN_OUT,
  START_FETCHING,
  STOP_FETCHING,
  SET_ERROR,
  UNSET_ERROR,
} from "./types";
import firebase from "firebase/app";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  firebase.auth().signOut();
  return {
    type: SIGN_OUT,
  };
};

export const fetch = () => {
  return {
    type: START_FETCHING,
  };
};

export const stopFetch = () => {
  return {
    type: STOP_FETCHING,
  };
};

export const setError = (message) => {
  return {
    type: SET_ERROR,
    payload: message,
  };
};

export const unsetError = () => {
  return {
    type: UNSET_ERROR,
  };
};
