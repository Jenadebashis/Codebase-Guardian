import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/authActions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: payload
      };
    default:
      return state;
  }
}
