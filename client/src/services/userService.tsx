import axiosWithAuth from "../utils/axiosWithAuth";
import { userSample } from "../utils/constants";

//GET AUTHENTICATED USER PROFILE
export const getUser = async () => {
  // const { data } = await axiosWithAuth.get("/users/profile");
  // return data;
  return userSample;
};
