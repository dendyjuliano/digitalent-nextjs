import axios from "axios";
import {
  LIST_PESERTA_REQUEST,
  LIST_PESERTA_SUCCESS,
  LIST_PESERTA_FAIL,
  DETAIL_LIST_PESERTA_REQUEST,
  DETAIL_LIST_PESERTA_SUCCESS,
  DETAIL_LIST_PESERTA_FAIL,
} from "../../types/sertifikat/list-peserta.type";

export const getAllParticipant =
  (
    id,
    page = 1,
    keyword = "",
    limit = 5,
    publish = null,
    startdate = null,
    enddate = null,
    token
  ) =>
  async dispatch => {
    try {
      dispatch({ type: LIST_PESERTA_REQUEST });
      let link =
        process.env.END_POINT_API_SERTIFIKAT +
        `api/manage_certificates/detail-mitra/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (publish) link = link.concat(`&publish=${publish}`);
      if (startdate) link = link.concat(`&startdate=${startdate}`);
      if (enddate) link = link.concat(`&enddate=${enddate}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(link, config);
      console.log(data);
      if (data) {
        dispatch({ type: LIST_PESERTA_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: LIST_PESERTA_FAIL, payload: error.message });
    }
  };

export const getDetailParticipant =
  (
    id,
    page = 1,
    keyword = "",
    limit = 5,
    publish = null,
    startdate = null,
    enddate = null,
    token
  ) =>
  async dispatch => {
    try {
      dispatch({ type: DETAIL_LIST_PESERTA_REQUEST });
      let link =
        process.env.END_POINT_API_SERTIFIKAT +
        `api/manage_certificates/detail-mitra/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (publish) link = link.concat(`&publish=${publish}`);
      if (startdate) link = link.concat(`&startdate=${startdate}`);
      if (enddate) link = link.concat(`&enddate=${enddate}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(link, config);
      if (data) {
        dispatch({ type: DETAIL_LIST_PESERTA_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: DETAIL_LIST_PESERTA_FAIL, payload: error.message });
    }
  };