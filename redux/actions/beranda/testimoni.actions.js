import {
    BERANDA_TESTIMONI_REQUEST,
    BERANDA_TESTIMONI_SUCCESS,
    BERANDA_TESTIMONI_FAIL,

    DETAIL_BERANDA_TESTIMONI_REQUEST,
    DETAIL_BERANDA_TESTIMONI_SUCCESS,
    DETAIL_BERANDA_TESTIMONI_FAIL,

    KATEGORI_BERANDA_TESTIMONI_REQUEST,
    KATEGORI_BERANDA_TESTIMONI_SUCCESS,
    KATEGORI_BERANDA_TESTIMONI_FAIL,

    TAG_BERANDA_TESTIMONI_REQUEST,
    TAG_BERANDA_TESTIMONI_SUCCESS,
    TAG_BERANDA_TESTIMONI_FAIL,

    CEK_LULUS_PELATIHAN_REQUEST,
    CEK_LULUS_PELATIHAN,
    CEK_LULUS_FAIL,

    CLEAR_ERRORS,
} from "../../types/beranda/testimoni.type"

import axios from "axios";

// Get all data
export const getAllBerandaTestimoni =
    (
        page = 1,
        keyword = "",
        limit = 5,
        filterPublish = "desc",
        sort = "",
        category_id = "",
        category_name = "",
        category_akademi = "",
        tag = "",
    ) =>
        async dispatch => {
            try {
                dispatch({ type: BERANDA_TESTIMONI_REQUEST })

                let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/artikel?page=${page}`
                if (keyword) link = link.concat(`&keyword=${keyword}`);
                if (limit) link = link.concat(`&limit=${limit}`);
                if (filterPublish) link = link.concat(`&filterPublish=${filterPublish}`);
                if (sort) link = link.concat(`&sort=${sort}`);
                if (category_id) link = link.concat(`&category_id=${category_id}`);
                if (category_name) link = link.concat(`&category_name=${category_name}`);
                if (category_akademi) link = link.concat(`&category_akademi=${category_akademi}`);
                if (tag) link = link.concat(`&tag=${tag}`);

                const { data } = await axios.get(link);

                dispatch({
                    type: BERANDA_TESTIMONI_SUCCESS,
                    payload: data,
                })

            } catch (error) {
                dispatch({
                    type: BERANDA_TESTIMONI_FAIL,
                    payload: error.response.data.message,
                });
            }
        }

export const getDetailBerandaTestimoni = (id) => async dispatch => {
    try {
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/artikel/${id}`

        const { data } = await axios.get(link)

        dispatch({
            type: DETAIL_BERANDA_TESTIMONI_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: DETAIL_BERANDA_TESTIMONI_FAIL,
            payload: error.response.data.message
        })
    }
}

export const cekLulus = (token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        let link = process.env.END_POINT_API_PELATIHAN + `api/v1/formPendaftaran/cek-lulus-peserta`

        const { data } = await axios.get(link, config)

        dispatch({
            type: CEK_LULUS_PELATIHAN,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: CEK_LULUS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getKategoriBerandaTestimoni = () => async dispatch => {
    try {
        dispatch({ type: KATEGORI_BERANDA_TESTIMONI_REQUEST })

        // let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori`
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori?keyword=Artikel&type=home`

        const { data } = await axios.get(link)

        dispatch({
            type: KATEGORI_BERANDA_TESTIMONI_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: KATEGORI_BERANDA_TESTIMONI_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const getTagBerandaTestimoni = () => async dispatch => {
    try {

        dispatch({ type: TAG_BERANDA_TESTIMONI_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/tag/artikel`

        const { data } = await axios.get(link)

        dispatch({
            type: TAG_BERANDA_TESTIMONI_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TAG_BERANDA_TESTIMONI_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear Error
export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};