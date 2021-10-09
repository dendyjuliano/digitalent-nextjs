// parameter
// cari limit page

import {
  PAGE_REQUEST,
  PAGE_SUCCESS,
  PAGE_FAIL,
  SET_PAGE,
  LIMIT_CONFIGURATION,
  SEARCH_COORPORATION,
  POST_PAGE_REQUEST,
  POST_PAGE_SUCCESS,
  POST_PAGE_FAIL,
  UPDATE_PAGE_REQUEST,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_FAIL,
  UPDATE_PAGE_RESET,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
  DETAIL_PAGE_REQUEST,
  DETAIL_PAGE_SUCCESS,
  DETAIL_PAGE_FAIL,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/page.type";

import axios from "axios";

export const getAllPage =
  (page = 1, cari = "", limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: PAGE_REQUEST });
      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-page/all?page=${page}`;
      if (cari) link = link.concat(`&cari=${cari}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAGE_FAIL,
        payload: error.message,
      });
    }
  };

export const deletePage = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PAGE_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-page/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_PAGE_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postPage = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_PAGE_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-page/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_PAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const getDetailPages = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_PAGE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-page/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_PAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_PAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePage = (sendData, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PAGE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    // let link =
    //   process.env.END_POINT_API_SITE_MANAGEMENT +
    //   `api/setting-page/update/${id}`;

    const { data } = await axios.post(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-page/update/${id}`,
      sendData,
      config
    );

    dispatch({
      type: UPDATE_PAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
