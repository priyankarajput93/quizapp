import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import AppReducer from "./reducers";

export const Store = configureStore(
    {
        reducer: {
            appReducer: AppReducer,
        }
    },
    applyMiddleware(thunk)
);