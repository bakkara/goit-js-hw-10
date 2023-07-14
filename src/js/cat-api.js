import axios from "axios";
// import SlimSelect from 'slim-select'
import { elements, BASE_URL, END_POINT, breedSelect } from "./refs";

function fetchBreeds() {
    return axios.get(`${BASE_URL}${END_POINT}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            elements.select.style.display = "block";
            elements.loader.style.display = "none";
            return response.data;
        });
}

function fetchCatByBreed(breedId) {
    elements.loader.style.display = "block";
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => {
            if (response.status !== 200) {
                elements.error.style.display = "block";
                throw new Error(response.statusText);
            }
            elements.loader.style.display = "none";
            return response.data;
        });
}

function createMarkup(arr) {
    const { url, breeds } = arr[0];
    return `<img src="${url}" alt="${breeds[0].name}" width="400">
    <div class="container">
        <h2 class="title-cat">${breeds[0].name}</h2>
        <p class="description-cat">${breeds[0].description}</p>
        <p class="temperament-cat">Temperament: ${breeds[0].temperament}</p>
    </div>`;
}

export {fetchBreeds, fetchCatByBreed, createMarkup}

// function fetchBreeds() {
    
//     return axios.get(`${BASE_URL}${END_POINT}`)
//         .then(response => {
//             if (response.status !== 200) {
//                 throw new Error(response.statusText);
//             }
//             /* breedSelect.style.display = "block"; */
//             elements.loader.style.display = "none";
//             return response.data;
//         });
// }

// function fetchCatByBreed(breedId) {
//     elements.loader.style.display = "block";
//     return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
//         .then(response => {
//             if (response.status !== 200) {
//                 elements.error.style.display = "block";
//                 throw new Error(response.statusText);
//             }
//             elements.loader.style.display = "none";
//             return response.data;
//         });
// }

// function createMarkup(arr) {
//     const { url, breeds } = arr[0];
//     return `<img src="${url}" alt="${breeds[0].name}" width="300">
//     <h2 class="title-cat">${breeds[0].name}</h2>
//     <p class="description-cat">${breeds[0].description}</p>
//     <p class="temperament-cat">Temperament: ${breeds[0].temperament}</p>`;
// }