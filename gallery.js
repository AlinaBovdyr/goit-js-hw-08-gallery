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

const galleryContainer = document.querySelector('.js-gallery');
galleryContainer.insertAdjacentHTML(
  'afterbegin',
  createGalleryMarkup(galleryItems),
);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {}
