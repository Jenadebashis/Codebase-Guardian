import api from '../../utils/api';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from './types';

export const login = (username, password) => async dispatch => {
  try {
    const res = await api.post('/auth/login', { username, password });
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
    const res = await api.post('/auth/register', { username, password });
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

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};