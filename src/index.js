import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
// import Notiflix from 'notiflix';
import './style.css';

const breedsSelect = document.querySelector('.breed-select');
const catsList = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorText = document.querySelector('.error');
breedsSelect.addEventListener('change', listBreedsCats);

loader.classList.replace('loader', 'is-hidden');
catsList.classList.add('is-hidden');
errorText.classList.add('is-hidden');

function selectOptions(data) {
  return data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

fetchBreeds()
  .then(response => {
    const breeds = response.data;
    console.log(breeds);
    breedsSelect.innerHTML = selectOptions(breeds);
  })
  .catch(console.warn);
// .catch(errorText.classList.remove('is-hidden'));

function listBreedsCats(e) {
  loader.classList.replace('is-hidden', 'loader');
  breedsSelect.classList.add('is-hidden');
  catsList.classList.add('is-hidden');

  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      breedsSelect.classList.remove('is-hidden');
      const { url, breeds } = data[0];
      catsList.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
    })
    .catch(console.warn);
}

// const breedSelectEl = document.querySelector('.breed-select');
// const catInfo = document.querySelector('.cat-info');

// function selectOptions(data) {
//   return data
//     .map(({ name, id }) => `<option value=${id} >${name}</option> `)
//     .join('');
// }
// fetchBreeds()
//   .then(response => {
//     const breeds = response.data;
//     console.log(breeds);
//     breedSelectEl.innerHTML = selectOptions(breeds);
//   })
//   .cath(console.warn());
