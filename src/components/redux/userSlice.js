import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: null,
  staff_name: null,
  staff_role: null,
  staff_pic: null,
  staff_FacLoc: null,
  loading: false,
  error: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state._id = action.payload._id;
      state.staff_name = action.payload.staff_name;
      state.staff_role = action.payload.staff_role;
      state.staff_pic = action.payload.staff_pic;
      state.staff_FacLoc = action.payload.staff_FacLoc;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      // console.log("running");
      state._id = null;
      state.staff_name = null;
      state.staff_role = null;
      state.staff_pic = null;
      state.staff_FacLoc = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
