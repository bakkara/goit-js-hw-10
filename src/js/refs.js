const API_KEY = "live_HqCR5PyR8vjKZX5ffwJ1lhg7zIzMV3JZebeYJdXgeImkpO0WkkWfQUFcV8I3fqAk";
const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = '/breeds';
 
const elements = {
    select: document.querySelector('#single'),
    container: document.querySelector('.cat-info'),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
}

export {API_KEY, elements, BASE_URL, END_POINT, breedSelect}