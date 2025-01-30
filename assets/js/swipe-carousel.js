function SwipeCarousel {
    Carousel.apply(this, arguments);

}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype.swipeStartHandler = function (e) {
    this.startPosX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
}

SwipeCarousel.prototype.swipeEndHandler = function (e) {
    this.endPosX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;

    if (this.endPosX - this.startPosX > 100) prevHandler();
    if (this.endPosX - this.startPosX < -100) nextHandler();
}

SwipeCarousel.prototype.initListeners = function () {
    Carousel.prototype.initListeners.apply(this);
    this.container.addEventListener('touchstart', this.swipeStartHandler.bind(this), { passive: true });
    this.container.addEventListener('mousedown', this.swipeStartHandler.bind(this));
    this.container.addEventListener('touchend', this.swipeEndHandler.bind(this));
    this.container.addEventListener('mouseup', this.swipeEndHandler.bind(this));
}