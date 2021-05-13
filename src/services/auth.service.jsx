const axios = require("axios");

export async function LogIn(username, password) {
    const response = await axios.post('http://127.0.0.1:8080/login', {
        username: username,
        password: password
    }).catch(err => {
        console.log(err);
    });
    console.log(response);

    return response.data;
}
