import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: "user",
    initialState: {
        nameUser: null,
        emailUser: null,
    },
    reducers: {
        setNameUser: (state, action) => {
            state.nameUser = action.payload
        },
        setEmailUser: (state, action) => {
            state.emailUser = action.payload
        }
    }
})

export const { setEmailUser, setNameUser } = userReducer.actions
export default userReducer.reducer