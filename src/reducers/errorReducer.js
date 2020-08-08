import { SET_ERROR, UNSET_ERROR } from "../actions/types";
const INITIAL_STATE = {
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: true, message: action.payload };
    case UNSET_ERROR:
      return { ...state, error: false, message: "" };

    default:
      return state;
  }
};
