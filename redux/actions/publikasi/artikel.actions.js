import {
  ARTIKEL_REQUEST,
  ARTIKEL_SUCCESS,
  ARTIKEL_FAIL,
  NEW_ARTIKEL_REQUEST,
  NEW_ARTIKEL_SUCCESS,
  NEW_ARTIKEL_RESET,
  NEW_ARTIKEL_FAIL,
  DELETE_ARTIKEL_REQUEST,
  DELETE_ARTIKEL_SUCCESS,
  DELETE_ARTIKEL_RESET,
  DELETE_ARTIKEL_FAIL,
  DETAIL_ARTIKEL_REQUEST,
  DETAIL_ARTIKEL_SUCCESS,
  DETAIL_ARTIKEL_FAIL,
  UPDATE_ARTIKEL_REQUEST,
  UPDATE_ARTIKEL_SUCCESS,
  UPDATE_ARTIKEL_RESET,
  UPDATE_ARTIKEL_FAIL,
  CLEAR_ERRORS,
} from "../../types/publikasi/artikel.type";

import axios from "axios";

// get all data
export const getAllArtikel =
  (page = 1, keyword = "", limit = 5, publish = null, startdate = null, enddate = null, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: ARTIKEL_REQUEST });

      // console.log (`Artikel: ${token}`)

      let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (publish) link = link.concat(`&publish=${publish}`);
      if (startdate) link = link.concat(`&startdate=${startdate}`);
      if (enddate) link = link.concat(`&enddate=${enddate}`);


    const config = {
      headers: {
          Authorization: 'Bearer ' + token,
      },
    };

      const { data } = await axios.get(link, config);

      dispatch({
        type: ARTIKEL_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: ARTIKEL_FAIL,
        payload: error.message,
      });
    }
  };

export const getDetailArtikel = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ARTIKEL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newArtikel = (artikelData, token) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_ARTIKEL_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PUBLIKASI + "api/artikel",
      artikelData,
      config
    );

    dispatch({
      type: NEW_ARTIKEL_SUCCESS,
      payload: data,
    });

    // console.log(artikelData)
  } catch (error) {
    dispatch({
      type: NEW_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateArtikel = (artikelData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ARTIKEL_REQUEST });

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    let link =
      process.env.END_POINT_API_PUBLIKASI + `api/artikel/${artikelData.id}`;

    const { data } = await axios.post(link, artikelData, config);

    dispatch({
      type: UPDATE_ARTIKEL_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: UPDATE_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteArtikel = (id, token ) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ARTIKEL_REQUEST });

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    console.log (`token-delete: ${token}`)

    const { data } = await axios.delete(
      process.env.END_POINT_API_PUBLIKASI + `api/artikel/${id}`, config
    );
    
    dispatch({
      type: DELETE_ARTIKEL_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
