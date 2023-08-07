import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

// import './style.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function updateCatInfo(cat) {
  catInfo.innerHTML = ''; // Очищити старі дані

  const catInfoDiv = document.createElement('div');
  catInfoDiv.innerHTML = `
  <h3>${cat.breeds[0].name}</h3>
  <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
  <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
  <img src="${cat.url}" alt="${cat.breeds[0].name}" width="500" >
  `;
  catInfo.appendChild(catInfoDiv); // Додати нову інформацію
}

function init() {
  showLoader();

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });
    })
    .catch(() => showError())
    .finally(hideLoader);

  select.addEventListener('change', e => {
    const breedId = e.target.value;

    catInfo.innerHTML = ''; // Очистити блок перед запитом

    showLoader();

    fetchCatByBreed(breedId)
      .then(cat => {
        updateCatInfo(cat);
      })
      .catch(() => showError())
      .finally(hideLoader);
  });
}

init();
// Функції оновлення інтерфейсу

function showLoader() {
  Notiflix.Loading.pulse();
}

function hideLoader() {
  Notiflix.Loading.remove();
}

function showError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
