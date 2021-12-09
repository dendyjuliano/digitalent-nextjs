import {
  ARTIKEL_PESERTA_REQUEST,
  ARTIKEL_PESERTA_SUCCESS,
  ARTIKEL_PESERTA_FAIL,

  NEW_ARTIKEL_PESERTA_REQUEST,
  NEW_ARTIKEL_PESERTA_SUCCESS,
  NEW_ARTIKEL_PESERTA_RESET,
  NEW_ARTIKEL_PESERTA_FAIL,

  DELETE_ARTIKEL_PESERTA_REQUEST,
  DELETE_ARTIKEL_PESERTA_SUCCESS,
  DELETE_ARTIKEL_PESERTA_RESET,
  DELETE_ARTIKEL_PESERTA_FAIL,

  DETAIL_ARTIKEL_PESERTA_REQUEST,
  DETAIL_ARTIKEL_PESERTA_SUCCESS,
  DETAIL_ARTIKEL_PESERTA_FAIL,

  UPDATE_ARTIKEL_PESERTA_REQUEST,
  UPDATE_ARTIKEL_PESERTA_SUCCESS,
  UPDATE_ARTIKEL_PESERTA_RESET,
  UPDATE_ARTIKEL_PESERTA_FAIL,

  CLEAR_ERRORS,
} from '../../types/publikasi/artikel-peserta.type'

import axios from "axios";

// get all data
export const getAllArtikelPeserta =
  (role, page = 1, keyword = "", limit = 5, publish = null, startdate = null, enddate = null, token, permission) =>
    async (dispatch) => {
      try {
        dispatch({ type: ARTIKEL_PESERTA_REQUEST });

        // let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel?role=${role}&page=${page}`;
        let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel?role=0&page=${page}`;
        if (keyword) link = link.concat(`&keyword=${keyword}`);
        if (limit) link = link.concat(`&limit=${limit}`);
        if (publish) link = link.concat(`&publish=${publish}`);
        if (startdate) link = link.concat(`&startdate=${startdate}`);
        if (enddate) link = link.concat(`&enddate=${enddate}`);

        const config = {
          headers: {
            Authorization: "Bearer " + token,
            "Permission": permission
          },
        };

        const { data } = await axios.get(link, config);
        dispatch({
          type: ARTIKEL_PESERTA_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ARTIKEL_PESERTA_FAIL,
          payload: error.response.data.message,
        });
      }
    };

export const getDetailArtikelPeserta = (id, token, permission) => async (dispatch) => {
  try {
    let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ARTIKEL_PESERTA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ARTIKEL_PESERTA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newArtikelPeserta = (artikelPesertaData, token, permission) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_ARTIKEL_PESERTA_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel`

    const { data } = await axios.post(link, artikelPesertaData, config);

    dispatch({
      type: NEW_ARTIKEL_PESERTA_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: NEW_ARTIKEL_PESERTA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateArtikelPeserta = (artikelPesertaData, token, permission) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ARTIKEL_PESERTA_REQUEST });

    let link =
      process.env.END_POINT_API_PUBLIKASI + `api/artikel/${artikelPesertaData.id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(link, artikelPesertaData, config);

    dispatch({
      type: UPDATE_ARTIKEL_PESERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ARTIKEL_PESERTA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteArtikelPeserta = (id, token, permission) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ARTIKEL_PESERTA_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_PUBLIKASI + `api/artikel/${id}`, config
    );

    dispatch({
      type: DELETE_ARTIKEL_PESERTA_SUCCESS,
      payload: data.status,
    });

  } catch (error) {
    dispatch({
      type: DELETE_ARTIKEL_PESERTA_FAIL,
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
