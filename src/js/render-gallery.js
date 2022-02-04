// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

export { renderGallery };

const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  const markup = images
    .map(
      ({
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b></br>${likes}</p>
              <p class="info-item"><b>Views</b></br>${views}</p>
              <p class="info-item"><b>Comments</b></br>${comments}</p>
              <p class="info-item"><b>Downloads</b></br>${downloads}</p>
            </div>
          </div>
        </a>`,
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  var lightbox = new SimpleLightbox('.gallery a').refresh();
}
