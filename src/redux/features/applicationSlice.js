import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showPopup: false,
    popupType: null,
    popupSize: 'md',
    showMobile: false
}

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        closePopup: (state) => {
            state.showPopup = false;
            state.popupType = null
            state.popupSize = 'md';
        },
        setShowPopup: (state, action) => {
            state.showPopup = true;
            state.popupType = action.payload.type;
            state.popupSize = action.payload.size;
        },
        setShowMobile: (state, action) => {
            state.showMobile = action.payload;
        }
    },
});

export const {closePopup, setShowPopup, setShowMobile} = applicationSlice.actions;
export default applicationSlice.reducer;