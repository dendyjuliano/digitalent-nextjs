import {
  SIMONAS_KANDIDAT_REQUEST,
  SIMONAS_KANDIDAT_SUCCESS,
  SIMONAS_KANDIDAT_FAIL,
} from "../../../types/dashboard-kabadan/data-peserta/simonas.type";

import axios from "axios";

export const getAllSimonasKandidat =
  (token, page = null, keyword = "", limit = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_KANDIDAT_REQUEST });

      let link = process.env.END_POINT_API_PELATIHAN + `api/kandidat/simonas?`;
      if (page) link = link.concat(`&page=${page}`);
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_KANDIDAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_KANDIDAT_FAIL,
        payload: error.message,
      });
    }
  };