import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { signInFormType } from "../utils/types";

export const createAccount = async ({
  email,
  username,
  password,
}: signInFormType) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      username,
      password,
    });
    return data;
  } catch (error) {
    return { statusCode: "409", message: "User Already Exists" };
  }
};

export const signIn = async ({ email, password }: signInFormType) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    return data;
  } catch (error) {
    return { statusCode: "401", message: "Wrong email or password" };
  }
};
