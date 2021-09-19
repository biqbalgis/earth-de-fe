import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated:  false,
    userInfo: localStorage.getItem("userInfo") || {},
    profilePicURL: null,
    refreshToken: localStorage.getItem("refresh")|| null,
    accessToken: null
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
      // if(action.payload==false)
      //   localStorage.removeItem("isAuthenticated");
      // else
      localStorage.setItem("isAuthenticated", action.payload);

    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      action.payload ? localStorage.setItem("refresh", action.payload) : localStorage.removeItem("refresh");
    },
    setProfilePicURl: (state, action) => {
      state.profilePicURL = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      action.payload ? localStorage.setItem("userInfo", action.payload): localStorage.removeItem("userInfo");
    }
  }
});

export const {setUserInfo, setAccessToken, setRefreshToken, setAuthentication, setProfilePicURl} = AuthSlice.actions;
const authReducer = AuthSlice.reducer;
export default authReducer;
