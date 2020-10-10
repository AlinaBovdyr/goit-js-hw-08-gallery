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
const modal = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const lightboxImg = document.querySelector('.lightbox__image');

galleryContainer.insertAdjacentHTML(
  'afterbegin',
  createGalleryMarkup(galleryItems),
);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
  event.preventDefault();

  const imageEl = event.target

  if (!imageEl.classList.contains('gallery__image')) {
    return
  }
  
  openModal();

  changeLightboxImgAttributes(imageEl);

  closeModal();
}

function openModal() {
  modal.classList.add("is-open");
}

function closeModal() {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove("is-open");
    lightboxImg.setAttribute('src', '');
    lightboxImg.setAttribute('alt', '');
  })
}

function changeLightboxImgAttributes(image) {
  const urlOriginal = image.dataset.source;
  const altAttribute = image.alt;
  lightboxImg.setAttribute('src', `${urlOriginal}`);
  lightboxImg.setAttribute('alt', `${altAttribute}`);
}