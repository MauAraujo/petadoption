import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const axios = require("axios");
const cookies = new Cookies();

export async function LogIn(username, password) {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const response = await axios
    .post(`${serverURL}/auth/login`, {
      username: username,
      password: password,
    })
    .catch((err) => {
      console.log(err);
    });
  cookies.set("access", response.data, { path: "/" });
  return response.data;
}

export function GetSession() {
  const token = cookies.get("access");
  const decoded = jwt_decode(token);
  return decoded;
}
