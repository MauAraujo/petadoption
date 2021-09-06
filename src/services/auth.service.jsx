import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const axios = require("axios");
const cookies = new Cookies();


export async function LogIn(username, password) {
    const response = await axios.post('http://127.0.0.1:8082/auth/login', {
        username: username,
        password: password
    }).catch(err => {
        console.log(err);
    });
    console.log(response);
    cookies.set('access', response.data, { path: '/' });
    return response.data;
}

export function GetSession() {
    const token = cookies.get('access');
    const decoded = jwt_decode(token);
    console.log(decoded);
    return decoded;
}
