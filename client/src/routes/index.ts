import { ComponentType } from "react";

import HomePage from "../pages/Home/HomePage";
import SigninPage from "../pages/Signin/SigninPage";
import SignUpPage from "../pages/Signup/SignUpPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AddChannelPage from "../pages/AddFriend/AddFriend";
import ChannelPage from "../pages/Channel/ChannelPage";
import Edit from "../pages/Edit";
import AddFriendPage from "../pages/AddFriend/AddFriend";
import Chat from "../pages/Chat";
import CreateChannel from "../pages/Create";
import Create from "../pages/Create";
import ProfileEdit from "../pages/ProfileEdit";

export enum Paths {
  HOME = "/",
  SIGNUP = "/sign-up",
  SIGNIN = "/sign-in",
  PROFILE = "/profile",
  EDITPROFILE = "/profile/edit",
  CREATE = "/create",
  CHANNEL = "/channel",
  ADDFRIEND = "/addfriend",
  EDIT = "/edit",
  CHAT = "/chat",
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
  { path: Paths.ADDFRIEND, Component: AddFriendPage },
  { path: Paths.EDITPROFILE, Component: ProfileEdit },
  { path: Paths.CHANNEL, Component: ChannelPage },
  { path: Paths.CHAT, Component: Chat },
  { path: Paths.CREATE, Component: Create },
  { path: Paths.EDIT, Component: Edit },
];
