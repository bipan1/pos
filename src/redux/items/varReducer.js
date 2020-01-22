import {SET_ITEM_ID, SET_CATEGORY} from './varTypes';

const initialState = {
    category : '',
    itemId : ''
}

const varReducer = (state= initialState, action) => {
    switch(action.type){
        case SET_ITEM_ID:
            return {
                ...state,
                itemId : action.payload
            }

        case SET_CATEGORY:
            return {
                ...state,
                category : action.payload
            }
            default : return state
    }
}

export default varReducer;