import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsReducer'
import userReducer from './userReducer'
import cartCountReducer from './cartCount'

export default configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
        cartCount: cartCountReducer,
    }
})