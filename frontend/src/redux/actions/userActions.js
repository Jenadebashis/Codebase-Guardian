import api from '../../utils/api';
import { GET_USERS_SUCCESS, GET_USERS_FAIL } from './types';

export const getUsers = () => async dispatch => {
  try {
    const res = await api.get('/users');
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: err.response.data
    });
  }
};
