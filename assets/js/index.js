import SwipeCarousel from "./swipe-carousel.js";

const carousel = new SwipeCarousel({
    containerId: '#carousel',
    slideId: '.item',
    interval: 2000,
    isPlaying: true
})

carousel.init();
