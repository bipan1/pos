import {CALCULATE_COST, ADD_TO_BAG, DELETE_FROM_BAG} from './bagTypes';

const initialState = {
    bagList : [],
    totalCost : 0
}

const bagReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_BAG:
            return {
                ...state,
                bagList : [...state.bagList, ...action.payload],
            }
            
        case CALCULATE_COST:
            let totalcost = 0;
            state.bagList.map(item => {
                totalcost = totalcost + item.price
                return {}
            })
            return {
                ...state,
                totalCost : totalcost
            }

        case DELETE_FROM_BAG:
            const newList  = [...state.bagList];
            newList.splice(action.payload,1);
            let toDiff = (state.bagList[action.payload]).price
            return {
                ...state,
                bagList : newList,
                totalcost : (state.totalCost - toDiff)
            }

        default : return state
    }
}

export default bagReducer;