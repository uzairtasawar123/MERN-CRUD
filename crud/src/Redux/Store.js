import {configureStore} from '@reduxjs/toolkit';
import CustomerReducer from './Reducer/CustomerSlice'

export const Store = configureStore({
    reducer:{
        customer:CustomerReducer
    }
})