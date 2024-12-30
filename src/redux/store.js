import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import applicationReducer from "./features/applicationSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        application: applicationReducer
    },
});

// creating redux store