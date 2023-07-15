import axios from "axios";
import {API_KEY, BASE_URL, END_POINT} from "./refs";

axios.defaults.headers.common["x-api-key"] = API_KEY;

function fetchBreeds() {
    return axios.get(`${BASE_URL}${END_POINT}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.data;
        });
}

function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.data;
        });
}

export {fetchBreeds, fetchCatByBreed}