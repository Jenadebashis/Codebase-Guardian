import api from 'utils/api';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

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
