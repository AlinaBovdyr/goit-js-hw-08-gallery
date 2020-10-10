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
const backdrop = document.querySelector('.lightbox__overlay')

galleryContainer.insertAdjacentHTML(
  'afterbegin',
  createGalleryMarkup(galleryItems),
);

galleryContainer.addEventListener('click', onGalleryContainerClick);
backdrop.addEventListener('click', onModalClose);

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
  window.addEventListener('keydown', onKeyPress);
}

function closeModal() {
  closeModalBtn.addEventListener('click', onModalClose)
}

function changeLightboxImgAttributes(image) {
  const urlOriginal = image.dataset.source;
  const altAttribute = image.alt;
  lightboxImg.setAttribute('src', `${urlOriginal}`);
  lightboxImg.setAttribute('alt', `${altAttribute}`);
}

function onModalClose() {
  window.removeEventListener('keydown', onKeyPress);
  modal.classList.remove("is-open");
  lightboxImg.setAttribute('src', '');
  lightboxImg.setAttribute('alt', '');
}

function onKeyPress(event) {
  console.log(event);

  if (event.key === 'Escape') {
    onModalClose();
  } else if (event.key === 'ArrowRight') {
    const nextImg = event.target.closest('.gallery__item').nextSibling;
    console.log(nextImg);
    
    changeLightboxImgAttributes(nextImg.children[0].children[0]);
  } else if (event.key === 'ArrowLeft') {
    const prevImg = event.target.closest('.gallery__item').previousSibling;
    console.log(prevImg);
   
    changeLightboxImgAttributes(prevImg.children[0].children[0]) 
  }
}
