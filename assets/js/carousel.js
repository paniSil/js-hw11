/* Carousel class - general */

class Carousel {
    constructor(params) {
        const settings = { ...{ containerId: '#carousel', slideId: '.item', interval: 3000, isPlaying: true }, ...params };

        this.container = document.querySelector(settings.containerId);
        this.slidesItems = this.container.querySelectorAll(settings.slideId);
        this.TIMER_INTERVAL = settings.interval;
        this.isPlaying = settings.isPlaying;
    }

    /* Variables for css and listeners */
    _initProps() {
        this.slidesItems_COUNT = this.slidesItems.length;

        this.CODE_ARROW_LEFT = 'ArrowLeft';
        this.CODE_ARROW_RIGHT = 'ArrowRight';
        this.CODE_SPACE = 'Space';
        this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
        this.FA_PREV = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

        this.currentSlide = 0;

        this.timerId = null;

        this.startPosX = 0;
        this.endPosX = 0;
    }

    /* Creation of control buttons in DOM */
    _initControls() {
        const controls = document.createElement('div');
        const PAUSE = `
        <div id="pause-btn" class="control control-pause">
            <div id="fa-pause-icon">${this.FA_PAUSE}</div>
            <div id="fa-play-icon">${this.FA_PLAY}</div>
        </div>
        `
        const PREV = `
        <div id="prev-btn" class="control control-prev">
            ${this.FA_PREV}
        </div>
        `
        const NEXT = `
        <div id="next-btn" class="control control-next">
            ${this.FA_NEXT}
        </div>
        `

        controls.setAttribute('class', 'controls');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.container.append(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');

        this.pauseIcon = this.container.querySelector('#fa-pause-icon');
        this.playIcon = this.container.querySelector('#fa-play-icon');

        this.isPlaying ? this._pauseVisible() : this._playVisible();
    }

    /* Creation of indicator icons in DOM */
    _initIndicators() {
        const indicators = document.createElement('div');

        indicators.setAttribute('class', 'indicators');

        for (let i = 0; i < this.slidesItems_COUNT; i++) {
            let indicator = document.createElement('div');
            indicator.setAttribute('class', i ? 'indicator' : 'indicator active');
            indicator.dataset.slideTo = `${i}`;
            indicators.append(indicator);
        }
        this.container.append(indicators);

        this.indicatorsContainer = this.container.querySelector('.indicators');
        this.indicatorItems = document.querySelectorAll('.indicator');
    }

    /* Listeners block for buttons usage */
    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
        this.prevBtn.addEventListener('click', this.prev.bind(this));
        this.nextBtn.addEventListener('click', this.next.bind(this));
        this.indicatorsContainer.addEventListener('click', this._indicator.bind(this));
        this.container.addEventListener('mouseenter', this.pause.bind(this));
        this.container.addEventListener('mouseleave', this.play.bind(this));
        document.addEventListener('keydown', this._pressKey.bind(this));
    }

    /* Private fn, going to the cartain slide */
    _goToNth(n) {
        this.slidesItems[this.currentSlide].classList.toggle('active');
        this.indicatorItems[this.currentSlide].classList.toggle('active')
        this.currentSlide = (n + this.slidesItems_COUNT) % this.slidesItems_COUNT;
        this.slidesItems[this.currentSlide].classList.toggle('active');
        this.indicatorItems[this.currentSlide].classList.toggle('active');
    }

    /* Private fn, going to the next slide */
    _goToNext() {
        this._goToNth(this.currentSlide + 1);
    }

    /* Private fn, going to the previous slide */
    _goToPrev() {
        this._goToNth(this.currentSlide - 1);
    }

    /* Private fn, tick - automated slide playing with the timed interval*/
    _tick() {
        if (!this.isPlaying) return;
        if (this.timerId) return;
        this.timerId = setInterval(() => this._goToNext(), this.TIMER_INTERVAL);
    }

    /* Private fns, for toggling pause icon visability */
    _pauseVisible(isVisible = true) {
        this.pauseIcon.style.opacity = isVisible ? 1 : 0;
        this.playIcon.style.opacity = isVisible ? 0 : 1;
    }

    /* private, _playVisible function */
    _playVisible() {
        this._pauseVisible(false);
    }

    /* public fn, pause */
    pause() {
        if (!this.isPlaying) return;
        this.pauseBtn.innerHTML = this.FA_PLAY;
        this.isPlaying = false;
        clearInterval(this.timerId);
        this.timerId = null;
    }

    /* public fn, play */
    play() {
        if (this.isPlaying) return;
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
        this._tick();
    }

    /* public fn, toggling between pause and play */
    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    }

    /* public fn, going to previous slide AND pausing*/
    prev() {
        this.pause();
        this._goToPrev();
    }

    /* public fn, going to next slide AND pausing*/
    next() {
        this.pause();
        this._goToNext();
    }

    /* private fn, indicator correlates with the visible slide */
    _indicator(e) {
        const { target } = e; //const target = e.target;
        if (target.classList.contains('indicator')) {
            this.pause();
            this._goToNth(+target.dataset.slideTo);
        }
    }

    /* private fn, pressing certain keys to call fns */
    _pressKey(e) {
        const code = e.code;
        if (code === this.CODE_ARROW_LEFT) this.prev();
        if (code === this.CODE_ARROW_RIGHT) this.next();
        if (code === this.CODE_SPACE) {
            e.preventDefault();
            this.pausePlay();
        }
    }

    /* public, initialization of carousel fn */
    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this._tick();
    }
}

export default Carousel;