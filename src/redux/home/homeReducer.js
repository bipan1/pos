import {FETCH_API_REQUEST, FETCH_API_SUCESS, FETCH_API_FAILURE } from './homeTypes';

const initialState = {
    loading : false,
    error : '',
    recommendList : [],
    flag : false,
    gender : ''
}

const homeReducer = (state= initialState, action) => {
    switch(action.type) {
        case FETCH_API_REQUEST:
            return {
                ...state,
                loading : true
            }

        case FETCH_API_SUCESS:
            return {
                ...state,
                loading : false,
                recommendList : action.payload.recommended_items.results,
                gender : action.payload.gender,
                error : '',
                flag : true
            }
        
        case FETCH_API_FAILURE:
            return {
                ...state,
                falg : false,
                loading : false,
                recommendList : [],
                error : action.payload,
                gender : ''
            }
        default : return state
    }
}
export default homeReducer;