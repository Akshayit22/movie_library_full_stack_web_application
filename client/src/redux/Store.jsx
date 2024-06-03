import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from './slices/authSlice';
import profileSlice from './slices/profileSlice';


const rootReducer = combineReducers({
	auth:authReducer,
	profile:profileSlice,
	
});
    
export default rootReducer;