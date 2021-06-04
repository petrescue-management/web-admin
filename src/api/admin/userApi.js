import { baseURL } from "../../enum/consts";

export function getListMemberAPI(data) {
    return fetch(baseURL + `api/users/get-list-of-member-profiles?page=${data.page}&limit=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function getListVolunteerAPI(data) {
    return fetch(baseURL + `api/users/get-list-of-volunteer-profiles?page=${data.page}&limit=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function getListVolunteerRegistrationFormAPI(token) {
    return fetch(baseURL + `api/volunteer-registration-forms/get-list-volunteer-registration-form`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function getListVolunteerRegistrationFormByIdAPI(data) {
    return fetch(baseURL + `api/volunteer-registration-forms/get-volunteer-registration-form-by-id?volunteerFormId=${data.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function changeStatusVolunteerRegistrationFormAPI(data) {
    let requestBody = {
        volunteerRegistrationFormId: data.id,
        status: data.status,
        isEmail: data.isEmail,
        isPhone: data.isPhone,
        isName: data.isName,
        anotherReason: data.anotherReason
    }
    return fetch(baseURL + `api/volunteer-registration-forms/progressing-volunteer-registration-form`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        },
        body: JSON.stringify(requestBody)
    });
}

export function getRemoveRoleVolunteerAPI(data) {
    let requestBody = {
        userId: data.id,
        description: data.description,
        isWorking: data.isWorking,
        anotherReason: data.anotherReason
    }
    return fetch(baseURL + `api/users/remove-role-volunteer-for-user`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        },
        body: JSON.stringify(requestBody)
    });
}