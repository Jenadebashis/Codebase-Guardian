import { GET_SCANS_SUCCESS, GET_SCANS_FAIL } from '../actions/types';

const initialState = {
  scans: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SCANS_SUCCESS:
      return {
        ...state,
        scans: payload,
        loading: false,
      };
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
