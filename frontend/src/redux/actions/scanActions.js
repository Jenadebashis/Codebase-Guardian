import api from '../../utils/api';
import { CREATE_SCAN_SUCCESS, CREATE_SCAN_FAIL, GET_SCANS_SUCCESS, GET_SCANS_FAIL } from './types';

export const createScan = (scanData) => async (dispatch) => {
  try {
    const res = await api.post('/scans', scanData);
    dispatch({
      type: CREATE_SCAN_SUCCESS,
      payload: res.data,
    });
    //This is not a react hook, so we can't use useNavigate here.
    window.location.href = `/scan/${res.data._id}`;
  } catch (err) {
    dispatch({
      type: CREATE_SCAN_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

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
