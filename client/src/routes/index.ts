import { ComponentType } from "react";

import HomePage from "../pages/Home/HomePage";
import SigninPage from "../pages/Signin/SigninPage";
import SignUpPage from "../pages/Signup/SignUpPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AddChannelPage from "../pages/Add-Channel/AddChannelPage";
import ChannelPage from "../pages/Channel/ChannelPage";
import ChannelsPage from "../pages/Channels/ChannelsPage";
import UpdateChannelPage from "../pages/Update-channel/UpdateChannelPage";

export enum Paths {
  HOME = "/",
  SIGNUP = "/sign-up",
  SIGNIN = "/sign-in",
  PROFILE = "/profile",
  CHANNELS = "/channels",
  CHANNEL = "/channels/:id",
  ADD_CHANNEL = "/channels/add",
  UPDATE_CHANNEL = "/channels/:id/update",
}

export interface IRoute {
  path: Paths;
  Component: ComponentType;
}

export const publicRoutes: IRoute[] = [
  { path: Paths.HOME, Component: HomePage },
  { path: Paths.SIGNIN, Component: SigninPage },
  { path: Paths.SIGNUP, Component: SignUpPage },
];

export const authRoutes: IRoute[] = [
  { path: Paths.PROFILE, Component: ProfilePage },
  { path: Paths.ADD_CHANNEL, Component: AddChannelPage },
  { path: Paths.CHANNEL, Component: ChannelsPage },
  { path: Paths.CHANNELS, Component: ChannelPage },
  { path: Paths.UPDATE_CHANNEL, Component: UpdateChannelPage },
];
