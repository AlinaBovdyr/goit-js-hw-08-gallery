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
const backdrop = document.querySelector('.lightbox__overlay');

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
  if (event.key === 'Escape') {
    onModalClose();
  }

  const galleryImages = Array.from(galleryContainer.children).map(galleryItem => {
    return galleryItem.children[0].children[0];
  });
    
  const currentImage = galleryImages.find(galleryImage => {
    if (galleryImage.dataset.source === lightboxImg.getAttribute('src')) {
      return galleryImage
    }
  });
    
  const currentIndex = galleryImages.indexOf(currentImage);
  const lastImageNum = galleryImages.length - 1;
  
  if (event.key === 'ArrowRight') {
    if (currentIndex === lastImageNum) {
      return lightboxImg.setAttribute('src', galleryImages[0].dataset.source); 
    }
    lightboxImg.setAttribute('src', galleryImages[currentIndex + 1].dataset.source);
  } else if (event.key === 'ArrowLeft') {
    if (currentIndex === 0) {
     return lightboxImg.setAttribute('src', galleryImages[lastImageNum].dataset.source);
    }
    lightboxImg.setAttribute('src', galleryImages[currentIndex - 1].dataset.source);
  }
}
