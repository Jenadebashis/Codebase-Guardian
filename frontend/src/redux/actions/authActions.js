import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';


export const login = (username, password) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:5001/api/auth/login', { username, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data
    });
  }
};

export const register = (username, password) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:5001/api/auth/register', { username, password });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
  }
};