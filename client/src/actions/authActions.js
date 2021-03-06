import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

import { SET_CURRENT_USER } from "./types";

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      userData
    );
    const { token } = res.data;
    localStorage.setItem("@ExpressReactAuthToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("@ExpressReactAuthToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
