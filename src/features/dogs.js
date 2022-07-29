import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { dog: "", id: "" };

export const dogSlice = createSlice({
    name: "dog",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        setDog: (state, action) => {
            state.value = action.payload
        },
        removeDog: (state) => {
            state.value = initialStateValue
        }
    }
});



export const { setDog, removeDog } = dogSlice.actions;

export default dogSlice.reducer;
