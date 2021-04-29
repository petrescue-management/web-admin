import { baseURL } from "../../enum/consts";

export function getListRegisterCenterFormPagingAPI() {
    return fetch(baseURL + `api/search-center-registration-form`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            // Authorization: "Bearer " + IdToken
            keyword: "",
            pageIndex: 0,
            pageSize: 0,
            status: 0
        },
    });
}

export function getRegisterCenterFormByIdAPI(data) {
    return fetch(baseURL + `api/get-center-registration-form-by-id/${data.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            // Authorization: "Bearer " + IdToken
        },
    });
}

export function changeStatusRegisterCenterFormByIdAPI(data, token) {
    return fetch(baseURL + `api/procress-center-registration-form`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data),
    });
}