import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsReducer'
import userReducer from './userReducer'

export default configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
    },
})