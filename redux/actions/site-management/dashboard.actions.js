import {
	DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
	DRAW_LOAD_DATA_PESERTA_CITY_DASHBOARD_SITE_MANAGEMENT,
	DRAW_LOAD_DATA_PESERTA_DASHBOARD_SITE_MANAGEMENT,
	LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
	DRAW_LOAD_DATA_LIST_DASHBOARD_SITE_MANAGEMENT,
	LOAD_DATA_LIST_DASHBOARD_SITE_MANAGEMENT
} from "../../types/site-management/dashboard.type";

import axios from "axios";

export const loadDataZonasi = (token, type, page, tokenPermission) => {
  const params = {
    type,
    page,
  };

	return async (dispatch) => {
		try {
			dispatch({
				type: DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
			});

      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/dashboard/zonasi`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": tokenPermission
          },
        }
      );
      dispatch({
        type: LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
        payload: data,
        page,
      });
    } catch (error) {
      notify(error.response.data.message);
    }
  };
};

export const loadDataPeserta = (token, type, page, tokenPermission) => {
  const params = {
    type,
    page,
  };

	return async (dispatch) => {
		try {
			dispatch({
				type: DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
			});

      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/dashboard/participant`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": tokenPermission,
		  }
		  })

			if (type === "province") {
				dispatch({
					type: DRAW_LOAD_DATA_PESERTA_DASHBOARD_SITE_MANAGEMENT,
					payload: data,
					page,
				});
			} else {
				dispatch({
					type: DRAW_LOAD_DATA_PESERTA_CITY_DASHBOARD_SITE_MANAGEMENT,
					payload: data,
					page,
				});
			}
		} catch (error) {
			// notify(error.response.data.message);
		}
	};
};

export const loadDataZonasiNext = (token, type, page) => {
	const params = {
		type,
		page,
	};

  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/dashboard/zonasi`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": localStorage.getItem("token-permission")
          },
        }
      );
      dispatch({
        type: DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
        payload: data.data.list_zonasi,
      });
    } catch (error) {
      notify(error.response.data.message);
    }
  };
};

export const loadDataListZonasi = (token, page = 1,tokenPermission="") => {
	const params = {
		page,
	};

	return async (dispatch) => {
		try {
			let { data } = await axios.get(
				// `${process.env.END_POINT_API_PELATIHAN}/api/v1/formPendaftaran/peserta-zonasi`,
				`${process.env.END_POINT_API_SITE_MANAGEMENT}api/dashboard/zonasi-participant`,
				{
					params,
					headers: {
						authorization: `Bearer ${token}`,
						Permission: tokenPermission
					},
				}
			);
			dispatch({
				type: LOAD_DATA_LIST_DASHBOARD_SITE_MANAGEMENT,
				payload: data,
				page,
			});
		} catch (error) {
			// notify(error.response.data.message);
		}
	};
};