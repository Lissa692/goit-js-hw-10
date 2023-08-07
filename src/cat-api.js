import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

axios.defaults.headers.common['x-api-key'] =
  'live_HUzEVidwIvLhShhwtMI9bb08FzPTDIN6EuR0p3pZt6zniEn3cffXfsYdiBfSxWfe';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
    });
}
