import { CREATE_SCAN_SUCCESS, CREATE_SCAN_FAIL, GET_SCANS_SUCCESS, GET_SCANS_FAIL } from '../actions/types';

const initialState = {
  scans: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SCAN_SUCCESS:
      return {
        ...state,
        scans: [payload, ...state.scans],
        loading: false,
      };
    case GET_SCANS_SUCCESS:
      return {
        ...state,
        scans: payload,
        loading: false,
      };
    case CREATE_SCAN_FAIL:
    case GET_SCANS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
