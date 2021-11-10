import {
    BERANDA_GALERI_REQUEST,
    BERANDA_GALERI_SUCCESS,
    BERANDA_GALERI_FAIL,

    DETAIL_BERANDA_GALERI_REQUEST,
    DETAIL_BERANDA_GALERI_SUCCESS,
    DETAIL_BERANDA_GALERI_FAIL,

    KATEGORI_BERANDA_GALERI_REQUEST,
    KATEGORI_BERANDA_GALERI_SUCCESS,
    KATEGORI_BERANDA_GALERI_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/galeri.type"

import axios from "axios";

// Get all data

export const getAllBerandaGaleri = 
(
    page = 1,
    keyword = ""
) => 
    async dispatch => {
        try {
            dispatch({ type: BERANDA_GALERI_REQUEST})

            let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/gallery?page=${page}`
            if (keyword) link = link.concat(`&keyword=${keyword}`);

            const { data } = await axios.get(link);

            dispatch({
                type: BERANDA_GALERI_SUCCESS,
                payload: data,
            })
            
        } catch (error) {
            dispatch({
                type: BERANDA_GALERI_FAIL,
                payload: error.response.data.message,
            });
        }
    }

export const getDetailBerandaGaleri = (id) => async dispatch => {
    try {
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/gallery/${id}`

        const { data } = await axios.get(link)

        dispatch ({
            type: DETAIL_BERANDA_GALERI_SUCCESS,
            payload: data.data
        })
        
    } catch (error) {
        dispatch ({
            type: DETAIL_BERANDA_GALERI_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getKategoriBerandaGaleri = () => async dispatch => {
    try {
        dispatch({ type: KATEGORI_BERANDA_GALERI_REQUEST})

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori`

        const { data } = await axios.get(link)

        dispatch({
            type: KATEGORI_BERANDA_GALERI_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: KATEGORI_BERANDA_GALERI_FAIL,
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