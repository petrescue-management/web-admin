import { baseURL } from "../../enum/consts";

export function loginApi(data) {
    let requestBody = {
        email: data.email,
        password: data.password,
        deviceToken: data.deviceToken,
        applicationName: "Petrescue.app.systemadmin"
    }
    return fetch(baseURL + `/jwt/login-by-sysadmin`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        },
        body: JSON.stringify(requestBody),
    });
}