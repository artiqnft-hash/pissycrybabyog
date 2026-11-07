/**
 * Image Carousel Logic — 2 images side by side
 */

const carouselImages = [
  "assets/1st.jpg",
  "assets/2nd.jpg",
  "assets/ezgif-frame-001 (1).jpg",
  "assets/ezgif-frame-001.jpg",
  "assets/ezgif-frame-002.jpg",
  "assets/ezgif-frame-003.jpg",
  "assets/ezgif-frame-005.jpg",
  "assets/ezgif-frame-006.jpg",
  "assets/ezgif-frame-012.jpg",
  "assets/ezgif-frame-016.jpg",
  "assets/ezgif-frame-020 (1).jpg",
  "assets/ezgif-frame-020.jpg",
  "assets/ezgif-frame-023.jpg"
];

let currentIndex = 0;
const imgLeft  = document.getElementById('carousel-img-left');
const imgRight = document.getElementById('carousel-img-right');

function fadeOut(el) {
  el.style.opacity = '0';
}

function fadeIn(el) {
  el.style.opacity = '1';
}

function nextPair() {
  if (!imgLeft || !imgRight) return;

  // Fade both out
  fadeOut(imgLeft);
  fadeOut(imgRight);

  setTimeout(() => {
    // Advance by 2, wrap around
    currentIndex = (currentIndex + 2) % carouselImages.length;

    imgLeft.src  = carouselImages[currentIndex];
    imgLeft.alt  = `Carousel image ${currentIndex + 1}`;

    const rightIndex = (currentIndex + 1) % carouselImages.length;
    imgRight.src = carouselImages[rightIndex];
    imgRight.alt = `Carousel image ${rightIndex + 1}`;

    // Fade both back in once left image loads
    imgLeft.onload = () => { fadeIn(imgLeft); fadeIn(imgRight); };

    // Fallback for cached images
    if (imgLeft.complete) { fadeIn(imgLeft); fadeIn(imgRight); }
  }, 500);
}

// Preload all images for smoother performance
function preloadImages() {
  carouselImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Run setup on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  // Advance every 3 seconds
  setInterval(nextPair, 3000);
});
