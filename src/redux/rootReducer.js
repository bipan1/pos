import { combineReducers } from 'redux';
import homeReducer from './home/homeReducer';
import bagReducer from './bag/bagReducer';
import varReducer from './items/varReducer';

const rootReducer = combineReducers({
    home : homeReducer,
    bag : bagReducer,
    var : varReducer
})

export default rootReducer;