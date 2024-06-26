import axios from "axios";
import {
  loginSuccess,
  logoutUserFailed,
  logoutUserStart,
  logoutUserSuccess,
  registerFailed,
  registerStart,
  registerSuccess
} from "../../redux/authSlice";
import { DOMAIN } from "../../utils/settings/config";

export const loginUser = async (dispatch, navigate, user) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/users/login", user);
    const { data } = response;
    // Stocker le token et les détails de l'utilisateur dans le stockage local ou un état global
    localStorage.setItem("userToken", data.token);
    dispatch(loginSuccess(data));
    // Rediriger l'utilisateur après la connexion
    if (data.admin === "1") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const registerUser = async (dispatch, navigate, user) => {
  dispatch(registerStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/users/register`, user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed(err.response.data));
  }
};
export const logoutUser = async (
  dispatch,
  id,
  accessToken,
  navigate,
  axiosJWT
) => {
  dispatch(logoutUserStart());
  try {
    await axiosJWT.post(`${DOMAIN}/api/v1/users/logout`, id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logoutUserSuccess());
    localStorage.clear();
    navigate("/");
  } catch (err) {
    // Extract relevant error information
    const errorMessage = err.message || "An error occurred during logout";

    // Dispatch action with serializable payload
    dispatch(logoutUserFailed(errorMessage));
  }
};
