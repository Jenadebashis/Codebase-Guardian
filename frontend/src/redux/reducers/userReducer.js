import { GET_USERS_SUCCESS, GET_USERS_FAIL } from '../actions/types';

const initialState = {
  users: [],
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        error: null
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        users: [],
        error: payload
      };
    default:
      return state;
  }
}
