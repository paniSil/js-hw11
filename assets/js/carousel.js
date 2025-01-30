function Carousel(containerId = '#carousel', slideId = '.slide') {
    this.container = document.querySelector(containerId);
    this.slideItems = this.container.querySelectorAll(slideId);

    this.interval = 2000;
}

Carousel.prototype = {
    _initProps: function () {
        this.currentSlide = 0;
        this.isPlaying = true;
        this.timerId = null;

        this.startPosX = 0;
        this.endPosX = 0;

        this.SLIDES_COUNT = this.slides.length;
        this.TIMER_INTERVAL = 4000;
        this.CODE_ARROW_LEFT = 'ArrowLeft';
        this.CODE_ARROW_RIGHT = 'ArrowRight';
        this.CODE_SPACE = 'Space';
        this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    },

    _initControls: function () {
        const controls = document.createElement('div');

        const PAUSE = `
        <div id="pause-btn" class="control-pause">
            ${this.FA_PAUSE}
        </div>
        `;

        const PREV = `
        <div id="prev-btn" class="control-prev">
            ${this.FA_PREV}
        </div>
        `;

        const NEXT = `
        <div id="next-btn" class="control-next">
            ${this.FA_NEXT}
        </div>
        `;

        controls.setAttribute('id', 'controls-container');
        controls.setAttribute('class', 'controls');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.container.append(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');
    },

    _initIndicators: function () {
        const indicators = document.createElement('div');

        indicators.setAttribute('id', 'indicators-container')
        indicators.setAttribute('class', 'indicators');

        for (let i = 0; i < this.SLIDES_COUNT; i++) {
            const indicator = document.createElement('div');

            indicator.setAttribute('class', i ? 'indicator' : 'indicator active');
            indicator.dataset.slideTo = `${i}`;
            indicators.append(indicator);
        }

        this.container.append(indicators);

        this.indicatorsContainer = this.container.querySelector('.indicators');
        this.indicatorItems = this.container.querySelectorAll('.indicator');
    },

    _initListeners: function () {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this.indicator.bind(this));
        document.addEventListener('keydown', this._.bind(this));
    },

    _tick: function () {
        this.timerId = setInterval(() => this._, this.TIMER_INTERVAL);
    },

    _goToNth: function (n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicatorItems[this.currentSlide].classList.toggle('active')
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicatorItems[currentSlide].classList.toggle('active');
    },

    _goToNext: function () {
        _goToNth(this.currentSlide + 1);
    },

    _goToPrev: function () {
        _goToNth(this.currentSlide - 1);
    },

    pause: function () {
        if (!this.isPlaying) {
            return;
        }

        clearInterval(this.timerId);
        this.pauseBtn.innerHTML = this.FA_PLAY;
        this.isPlaying = false;
    },

    play: function () {
        this._tick();
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
    },

    pausePlay: function () {
        this.isPlaying ? this.pause() : this.play();
    },

    prev: function () {
        this.pause();
        this._();
    },

    next: function () {
        this.pause();
        this._();
    },

    indicator: function (e) {
        const { target } = e; //const target = e.target;
        if (target.classList.contains('indicator')) {
            this.pause();
            this._goToNth(+target.dataset.slideTo);
        }
    },

    _pressKey: function (e) {
        const code = e.code
        //const { code } = e;
        if (code === this.CODE_ARROW_LEFT) prev();
        if (code === this.CODE_ARROW_RIGHT) next();
        if (code === this.CODE_SPACE) {
            e.preventDefault();
            this.pausePlay();
        }
    },

    init: function () {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this._tick();
    }
}

Carousel.prototype.constructor = Carousel;