import SwipeCarousel from "./swipe-carousel.js";

const carousel = new SwipeCarousel({
    containerId: '#carousel',
    slideId: '.item',
    interval: 5000,
    isPlaying: true
})

carousel.init();
