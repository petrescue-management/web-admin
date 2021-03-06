import { baseURL } from "../../enum/consts";

export function getAllPetTypeAPI() {
    return fetch(baseURL + `api/pet-profiles/get-all-pet-types`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function createNewPetTypeAPI(data) {
    let value = {
        petTypeName: data.type
    }
    return fetch(baseURL + `api/pet-profiles/create-new-pet-type`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        },
        body: JSON.stringify(value)
    });
}

export function getAllPetColorsAPI() {
    return fetch(baseURL + `api/pet-profiles/get-all-pet-fur_colors`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function createNewPetFurColorAPI(data) {
    let value = {
        petFurColorName: data.color
    }
    return fetch(baseURL + `api/pet-profiles/create-new-pet-fur-color`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        },
        body: JSON.stringify(value)
    });
}

export function getAllPetBreedsAPI() {
    return fetch(baseURL + `api/pet-profiles/get-all-pet-breeds`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function getPetBreedByTypeIdsAPI(typeId) {
    return fetch(baseURL + `api/pet-profiles/get-pet-breeds-by-type-id?id=${typeId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function createNewPetBreedAPI(data) {
    let value = {
        petBreedName: data.petBreedName,
        petTypeId: data.petTypeId
    }
    return fetch(baseURL + `api/pet-profiles/create-new-pet-breed`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        },
        body: JSON.stringify(value)
    });
}

export function getConfigTimeAPI(token) {
    return fetch(baseURL + `api/config/get-system-parameters`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function configTimeAPI(data) {
    return fetch(baseURL + `api/config/configure-systems-parameters?reNotiTimeForOnline=${data.reNotiTimeForOnline}&reNotiTimeForAll=${data.reNotiTimeForAll}&notiTimeForDestroy=${data.destroyNotiTime}&remindTime=${data.remindTime}&imgFinder=${data.imgFinder}&imgPicker=${data.imgPicker}&nearestDistance=${data.nearestDistance}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}