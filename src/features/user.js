import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { email: "asd" };

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = { email: "" }
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
