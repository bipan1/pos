import { combineReducers } from 'redux';
import homeReducer from './home/homeReducer';
import bagReducer from './bag/bagReducer';

const rootReducer = combineReducers({
    home : homeReducer,
    bag : bagReducer
})

export default rootReducer;