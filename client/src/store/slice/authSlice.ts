import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models";

export interface AuthState {
  isAuth: boolean;
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
