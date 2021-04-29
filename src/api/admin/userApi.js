import { baseURL } from "../../enum/consts";

export function getListUserAPI(data) {
    return fetch(baseURL + `api/users/get-list-of-member-profiles?page=${data.page}&limit=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}