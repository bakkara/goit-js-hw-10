import axios from "axios";
import { API_KEY, elements } from "./refs";
import { fetchBreeds, fetchCatByBreed, createMarkup } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

Loading.standard('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
});

axios.defaults.headers.common["x-api-key"] = API_KEY;

fetchBreeds()
    .then(breeds => {
        Loading.remove();
        elements.select.innerHTML = breeds.map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`;
        }).join('');
        new SlimSelect({
            select: elements.select,
            settings: {
    showOptionTooltips: true,
  }
        })
    })
    .catch(error => console.log(error));

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
            Loading.remove();
            elements.container.innerHTML = createMarkup(data);
        })
        .catch(() => {
            Report.failure(
            "Oops! Something went wrong! Try reloading the page!",
            'Okay',
            );
        });
}