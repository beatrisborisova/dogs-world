import { createSlice } from '@reduxjs/toolkit';

const initialStateValueProfile = { email: "", name: "", avatar: "", city: "", gender: null };

export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        value: initialStateValueProfile
    },
    reducers: {
        userProfile: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { userProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;

