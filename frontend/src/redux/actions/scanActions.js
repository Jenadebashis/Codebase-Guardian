import api from '../../utils/api';
import { GET_SCANS_SUCCESS, GET_SCANS_FAIL } from './types';

export const getScans = () => async (dispatch) => {
  try {
    const res = await api.get('/scans');
    dispatch({
      type: GET_SCANS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SCANS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
