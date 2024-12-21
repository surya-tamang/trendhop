import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      const token = action.payload;
      const decodedToken = jwtDecode(token);
      state.user = decodedToken;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
