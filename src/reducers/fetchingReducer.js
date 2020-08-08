import { START_FETCHING, STOP_FETCHING } from "../actions/types";
const INITIAL_STATE = {
  isFetching: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING:
      return { ...state, isFetching: true };
    case STOP_FETCHING:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
