import {elements } from "./refs";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

Loading.standard('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
});

fetchBreeds()
    .then(breeds => {
        Loading.remove();
        elements.select.innerHTML = breeds.map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`;
        }).join('');
        new SlimSelect({
            select: elements.select,
        })
    })
    .catch(error => console.log(error))
    .finally(() => {
            Loading.remove();
    });

elements.select.addEventListener('change', onSelect)

function onSelect(evt) {
    evt.preventDefault();
    Loading.standard('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
});
    const breedId = evt.currentTarget.value;
    console.log(evt.currentTarget.value)
    fetchCatByBreed(breedId)
        .then(data => {
            elements.container.innerHTML = createMarkup(data);
        })
        .catch(() => {
             elements.container.innerHTML = "";
            Report.failure(
                "Oops! Something went wrong!",
                "Try reloading the page!",
                'Okay',
            );
        })
        .finally(() => {
            Loading.remove();
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