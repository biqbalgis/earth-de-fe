import {createSlice} from "@reduxjs/toolkit";
export const AlertType = Object.freeze({
  none: "",
  info: "info",
  error: "error",
  warning: "warning",
  success: "success"
});
export const SnackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    msg: null,
    alertType: AlertType.success,
    timeout: 6000 // set to -1  for removing timeout
  },
  reducers: {
    // action should be {msg:' Welcome to snackbar', alertType: AlertType.none}
    showSnackbar: (state, action) => {
      state.open = true;
      state.msg = action.payload.msg;
      state.alertType = action.payload.alertType ? action.payload.alertType : null;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
    setTimeout: (state, action) => {
      state.timeout = action.payload;
    }
  }
});
export const snackbarActions = SnackbarSlice.actions;
export const snackbarReducer = SnackbarSlice.reducer;
