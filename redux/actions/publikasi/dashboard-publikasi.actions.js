import {
  DASHBOARD_PUBLIKASI_REQUEST,
  DASHBOARD_PUBLIKASI_SUCCESS,
  DASHBOARD_PUBLIKASI_FAIL,

  ROLE_ADMIN_REQUEST,
  ROLE_ADMIN_SUCCESS,
  ROLE_ADMIN_FAIL,

  CLEAR_ERRORS
} from '../../types/publikasi/dashboard-publikasi.type'

import axios from "axios";

export const getAllDashboardPublikasi = (token, permission) =>
  async (dispatch) => {
    try {
      dispatch({ type: DASHBOARD_PUBLIKASI_REQUEST });

      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
          "Permission": permission
        },
      };

      let link = process.env.END_POINT_API_PUBLIKASI + `api/dashboard`;

      const { data } = await axios.get(link, config);

      dispatch({
        type: DASHBOARD_PUBLIKASI_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: DASHBOARD_PUBLIKASI_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getRoleAdmin = (token, permission) =>
  async (dispatch) => {
    try {
      dispatch({ type: ROLE_ADMIN_REQUEST });

      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
          "Permission": permission
        }
      };


      let link = process.env.END_POINT_API_SITE_MANAGEMENT + `api/user/publikasi`;

      const { data } = await axios.get(link, config);

      dispatch({
        type: ROLE_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ROLE_ADMIN_FAIL,
        payload: error.response.data.message
      })
    }
  }

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};