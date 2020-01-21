import {CALCULATE_COST, ADD_TO_BAG, DELETE_FROM_BAG} from './bagTypes';

export const addToBag = (data) => {
    return { 
        type : ADD_TO_BAG,
        payload : data
    }
}

export const deleteFromBag = (i) => {
    return {
        type : DELETE_FROM_BAG,
        payload : i
    }
}

export const calculateCost = () => {
    return {
        type : CALCULATE_COST
    }
}