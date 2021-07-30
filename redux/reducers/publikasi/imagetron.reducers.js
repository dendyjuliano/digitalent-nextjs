import {
    IMAGETRON_REQUEST,
    IMAGETRON_SUCCESS,
    IMAGETRON_FAIL,

    NEW_IMAGETRON_REQUEST,
    NEW_IMAGETRON_SUCCESS,
    NEW_IMAGETRON_RESET,
    NEW_IMAGETRON_FAIL,

    DELETE_IMAGETRON_REQUEST,
    DELETE_IMAGETRON_SUCCESS,
    DELETE_IMAGETRON_RESET,
    DELETE_IMAGETRON_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/imagetron.type'

export const allImagetronReducer = (state = { imagetron: [] }, action) => {
    switch (action.type) {
        case IMAGETRON_REQUEST:
            return {
                loading: true
            }

        case IMAGETRON_SUCCESS:
            return {
                loading: false,
                imagetron: action.payload.data
            }

        case IMAGETRON_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}

export const newImagetronReducer = (state = { imagetron: {} }, action) => {
    switch (action.type) {
        case NEW_IMAGETRON_REQUEST:
            return {
                loading: true
            }

        case NEW_IMAGETRON_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                imagetron: action.payload.data
            }

        case NEW_IMAGETRON_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_IMAGETRON_RESET:
            return {
                success: false
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}

export const deleteImagetronReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_IMAGETRON_REQUEST:
            return {
                loading: true
            }

        case DELETE_IMAGETRON_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_IMAGETRON_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_IMAGETRON_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}