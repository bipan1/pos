import {SET_ITEM_ID, SET_CATEGORY} from './varTypes';

export const setItemId = (data) => {
    return {
        type : SET_ITEM_ID,
        payload : data
    }
}

export const setCategory = (data) => {
    return {
        type : SET_CATEGORY,
        payload : data
    }
}