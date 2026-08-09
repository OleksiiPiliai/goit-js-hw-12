import axios from 'axios';

const API_KEY = '55965414-3154a5ab5237f7ce8780065e8';
const BASE_URL = 'https://pixabay.com/api/';

const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });

  return response.data;
}