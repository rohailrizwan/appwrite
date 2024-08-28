import { configureStore } from "@reduxjs/toolkit";
import authslice from "../slice/authslice";

const store = configureStore({
    reducer: {
        auth: authslice, // "authReducer" can be just "auth" to match the slice name
    },
});

// Export the store directly, without calling it as a function
export default store;
