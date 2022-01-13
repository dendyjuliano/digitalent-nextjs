import {
  OPTION_REFERENCE_REQUEST,
  OPTION_REFERENCE_SUCCESS,
  OPTION_REFERENCE_FAIL,
  GET_PENDIDIKAN_REFERENCE_SUCCESS,
  GET_PENDIDIKAN_REFERENCE_FAIL
} from "../../../types/site-management/option/option-reference.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export const allOptionReferenceSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPTION_REFERENCE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case OPTION_REFERENCE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case OPTION_REFERENCE_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};

export const allPendidikanReference = (state = { pendidikanReference: {} }, action) => {
  switch (action.type) {
    case GET_PENDIDIKAN_REFERENCE_SUCCESS:
      return {
        pendidikanReference: action.payload.data,
      };

    case GET_PENDIDIKAN_REFERENCE_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
