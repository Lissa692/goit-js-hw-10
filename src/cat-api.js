import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

axios.defaults.headers.common['x-api-key'] =
  'live_HUzEVidwIvLhShhwtMI9bb08FzPTDIN6EuR0p3pZt6zniEn3cffXfsYdiBfSxWfe';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}?breed_ids=${breedId}`).then(response => {
    return response.data;
  });
}
