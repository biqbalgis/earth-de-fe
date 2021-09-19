import {configureStore} from "@reduxjs/toolkit";
import {snackbarReducer} from "../modules/base/model/SnackbarSlice";
import authReducer from "../modules/auth/model/AuthSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer
  }
});
