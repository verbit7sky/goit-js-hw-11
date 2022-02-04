import axios from 'axios';
import { renderGallery } from './render-gallery';

export { getImages };

const KEY = '25389778-250668d82e7d5c0972db6f50a';

const BASE_URL = 'https://pixabay.com/api/';

// let page = 1;

async function getImages(query, pageNumber) {
  const data = await axios
    .get(
      `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`,
    )
    .then(response => response.data)
    .catch(error => console.log('error'));

  // console.log(data);

  return data;
}
