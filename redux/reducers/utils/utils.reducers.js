import {
  // PROVINSI
  PROVINSI_REQUEST,
  PROVINSI_SUCCESS,
  PROVINSI_FAIL,

  // KOTA
  KOTA_REQUEST,
  KOTA_SUCCESS,
  KOTA_FAIL,
  //   CLEAR_ERRORS,
  GET_SUPERADMIN_PERMISSION_REQUEST,
  GET_SUPERADMIN_PERMISSION_FAIL,
  GET_SUPERADMIN_PERMISSION_SUCCESS,
} from "../../types/utils/utils.type";

export const allProvinsiReducer = (state = { allProvinsi: [] }, action) => {
  switch (action.type) {
    case PROVINSI_REQUEST:
      return {
        loading: true,
      };

    case PROVINSI_SUCCESS:
      return {
        loading: false,
        allProvinsi: action.payload.data,
      };

    case PROVINSI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // case CLEAR_ERRORS:
    //   return {
    //     error: null,
    //   };

    default:
      return state;
  }
};

export const allKotaReducer = (state = { allKota: [] }, action) => {
  switch (action.type) {
    case KOTA_REQUEST:
      return {
        loading: true,
      };

    case KOTA_SUCCESS:
      return {
        loading: false,
        allKota: action.payload.data,
      };

    case KOTA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // case CLEAR_ERRORS:
    //   return {
    //     error: null,
    //   };

    default:
      return state;
  }
};

export const adminPermissionReducer = (state = { permission: {} }, action) => {
  switch (action.type) {
    case GET_SUPERADMIN_PERMISSION_REQUEST:
      return {
        loading: true,
      };
    case GET_SUPERADMIN_PERMISSION_SUCCESS:
      return {
        loading: false,
        permission: action.payload.data,
      };
    case GET_SUPERADMIN_PERMISSION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
