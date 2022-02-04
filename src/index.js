import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './js/get-images';
import { renderGallery } from './js/render-gallery';

const input = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const loadBtn = document.querySelector('.btn-load-more');
const gallery = document.querySelector('.gallery');

let pageNumber = 1;
let query = '';
var lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  pageNumber = 1;
  e.preventDefault();
  query = input.value.trim();
  console.log(query);
  gallery.innerHTML = '';

  if (!query) {
    enterRequest();
    return;
  }

  getImages(query, pageNumber).then(data => {
    if (data.hits.length === 0) {
      sorryNoResult();
    } else {
      renderGallery(data.hits);
      loadBtn.classList.remove('is-hidden');
    }
  });
}

// sorryNoResult();

loadBtn.addEventListener('click', onLoadBtn);

function onLoadBtn() {
  pageNumber += 1;

  console.log('onLoadBtn work');
  getImages(query, pageNumber)
    .then(data => {
      renderGallery(data.hits);
      if (data.hits.length < 40) {
        loadBtn.classList.add('is-hidden');
        endOfResults();
      }
    })
    .catch(error => console.log('error'));
}

function sorryNoResult() {
  Notiflix.Report.info(
    'Oooops',
    'Sorry, there are no images matching your search query. Please try again.',
    'okay',
    {
      width: '460px',
      svgSize: '120px',
    },
  );
}

function enterRequest() {
  Notiflix.Report.warning('Please', ' Enter your request', 'ok, i will try again ', {
    width: '460px',
    svgSize: '120px',
  });
}

function endOfResults() {
  Notiflix.Report.failure("We're sorry", " but you've reached the end of search results.", {
    width: '460px',
    svgSize: '120px',
  });
}
