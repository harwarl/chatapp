import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
  isAuth: boolean;
  token: string | null;
  user: IUser | null;
}

let initialState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
};

const token = Cookies.get("access_token");
if (token) {
  let { username, id, image, email }: any = jwtDecode(token);

  initialState = {
    isAuth: true,
    token: token,
    user: {
      username,
      id,
      image,
    },
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    signout: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { signout, setUser } = authSlice.actions;
