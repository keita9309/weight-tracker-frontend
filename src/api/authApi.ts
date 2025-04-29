import axios from "axios";
import { SignUpFormData } from "../types/auth";

export const signup = async (payload: SignUpFormData) => {
  const response = await axios.post("/auth/signup", payload);
  return response.data;
};
