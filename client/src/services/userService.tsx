import axiosWithAuth from "../utils/axiosWithAuth";

//GET AUTHENTICATED USER PROFILE
export const getUser = async () => {
  const { data } = await axiosWithAuth.get("/users/profile");
  return data;
};
