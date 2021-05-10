import { baseURL } from "../../enum/consts";

export function getListCenterPagingAPI(data) {
    let params = {
        keyword: "",
        pageIndex: 1
    }
    return fetch(baseURL + `api/centers/search-center?Keyword=${params.keyword}&PageIndex=${params.pageIndex}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function getCenterById(idCenter) {
    return fetch(baseURL + `api/centers/get-center-by-id/${idCenter}`, {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8 ",
            Accept: "*/*",
            // Authorization: "Bearer " + IdToken
        },
    });
}

export function deleteCenter(idCenter) {
    return fetch(baseURL + `api/centers/delete-center?id=${idCenter}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            // Authorization: "Bearer " + IdToken
        },
        // body: JSON.stringify(data),
    });
}