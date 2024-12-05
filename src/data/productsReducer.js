import { createSlice } from "@reduxjs/toolkit";

const productsReducer = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            action.payload.forEach((val, i) => {
                state[i] = val
            })
        }
    }
})

export const { setProducts } = productsReducer.actions
export default productsReducer.reducer