import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { email: "", name: "", avatar: "", city: "", gender: null };

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        register: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialStateValue
        }
    }
});

export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;
