import galleryItems from './gallery-items.js';

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </li>`;
    })
    .join('');
}

const galleryRef = document.querySelector('.js-gallery');
galleryRef.insertAdjacentHTML('afterbegin', createGalleryMarkup(galleryItems));
