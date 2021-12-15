import {
  MK_COOPORATION_REQUEST,
  MK_COOPORATION_SUCCESS,
  MK_COOPORATION_FAIL,
  SEARCH_COORPORATION,
  LIMIT_CONFIGURATION,
  SUCCESS_GET_SINGLE_COOPORATION,
  FAIL_GET_SINGLE_COOPORATION,
  SUCCESS_DELETE_COOPORATION_REQUEST,
  ERROR_DELETE_COOPORATION_REQUEST,
  SET_PAGE,
  SUCCESS_UPDATE_MASTER_CATEGORY,
  ERROR_UPDATE_MASTER_CATEGORY,
} from "../../types/partnership/mk_cooporation.type";

import {
  getAllMasterCategory,
  masterCategorySingle,
  deleteMasterCategory,
  masterCategoryUpdate,
} from "./api/master-category";

export const fetchAllMKCooporation = (token, permission) => {
  return async (dispatch, getState) => {
    dispatch({ type: MK_COOPORATION_REQUEST });
    let keywordState = getState().allMKCooporation.keyword || "";
    let limitState = getState().allMKCooporation.limit || "";
    let pageState = getState().allMKCooporation.page || 1;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };

    try {
      const { data } = await getAllMasterCategory(params, token, permission);
      dispatch(successFetchAllMKCooporation(data));
    } catch (error) {
      dispatch(errorfetchAllMKCooporation());
    }
  };
};

export const successFetchAllMKCooporation = (data) => {
  return {
    type: MK_COOPORATION_SUCCESS,
    data,
  };
};
export const errorfetchAllMKCooporation = (data) => {
  return {
    type: MK_COOPORATION_FAIL,
  };
};

export const searchCooporation = (text) => {
  return {
    type: SEARCH_COORPORATION,
    text,
  };
};

export const limitCooporation = (value) => {
  return {
    type: LIMIT_CONFIGURATION,
    limitValue: value,
  };
};

export const getSingleCooporation = (token, id) => {
  return async (dispatch) => {
    try {
      let { data } = await masterCategorySingle(token, id);
      dispatch(successGetSingleCooporation(data));
    } catch (error) {
      dispatch(failGetSingleCooporation(error.response.data.message));
    }
  };
};

export const successGetSingleCooporation = (data) => {
  return {
    type: SUCCESS_GET_SINGLE_COOPORATION,
    data,
  };
};
export const failGetSingleCooporation = (data) => {
  return {
    type: FAIL_GET_SINGLE_COOPORATION,
    data,
  };
};

export const deleteCooporation = (token, formData, id, permission) => {
  return async (dispatch) => {
    try {
      let { data } = await deleteMasterCategory(token, formData, id, permission);
      dispatch(successDeleteCooporation(data));
    } catch (error) {
      dispatch(errorDeleteCooporation(error.response.data.message));
    }
  };
};

export const successDeleteCooporation = (data) => {
  return {
    type: SUCCESS_DELETE_COOPORATION_REQUEST,
    data,
  };
};
export const errorDeleteCooporation = (data) => {
  return {
    type: ERROR_DELETE_COOPORATION_REQUEST,
    data,
  };
};

export const updateMasterCategory = (token, formData, id) => {
  return async (dispatch) => {
    try {
      let { data } = await masterCategoryUpdate(token, formData, id);
      dispatch(succesUpdateMasterCategory(data));
    } catch (error) {
      dispatch(errorUpdateMasterCategory(error.response.data.message));
    }
  };
};

export const succesUpdateMasterCategory = (data) => {
  return {
    type: SUCCESS_UPDATE_MASTER_CATEGORY,
    data,
  };
};
export const errorUpdateMasterCategory = (data) => {
  return {
    type: ERROR_UPDATE_MASTER_CATEGORY,
    data,
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};
