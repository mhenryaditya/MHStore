import { createSlice } from "@reduxjs/toolkit";

const cartCountReducer = createSlice({
    name: "cartCount",
    initialState: 0,
    reducers: {
        setCount: (state, action) => {
            state = action.payload
            return state
        },
    },
})

export const { setCount } = cartCountReducer.actions;
export default cartCountReducer.reducer