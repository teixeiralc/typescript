import Timeout from './utils/Timeout.js';
export default class Slide {
    time;
    index;
    container;
    slides;
    controls;
    currentSlide;
    paused;
    timeout;
    pausedTimeout;
    thumbItems;
    activeThumb;
    constructor(container, slides, controls, time = 5000) {
        this.time = time;
        this.index = localStorage.getItem('activeSlideIndex')
            ? Number(localStorage.getItem('activeSlideIndex'))
            : 0;
        this.container = container;
        this.slides = slides;
        this.currentSlide = this.slides[this.index];
        this.controls = controls;
        this.thumbItems = null;
        this.activeThumb = null;
        this.timeout = null;
        this.paused = false;
        this.pausedTimeout = null;
        this.init();
    }
    hide(el) {
        el.classList.remove('active');
        if (el instanceof HTMLVideoElement) {
            el.pause();
            el.currentTime = 0;
        }
    }
    show(index) {
        this.index = index;
        this.currentSlide = this.slides[index];
        localStorage.setItem('activeSlideIndex', String(this.index));
        if (this.thumbItems) {
            this.activeThumb = this.thumbItems[this.index];
            this.thumbItems.forEach((el) => el.classList.remove('active'));
            this.activeThumb.classList.add('active');
        }
        this.slides.forEach((el) => this.hide(el));
        this.slides[index].classList.add('active');
        if (this.currentSlide instanceof HTMLVideoElement) {
            this.autoVideo(this.currentSlide);
        }
        else {
            this.auto(this.time);
        }
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
        if (this.activeThumb)
            this.activeThumb.style.animationDuration = `${time}ms`;
    }
    autoVideo(video) {
        video.muted = true;
        video.play();
        let firstplay = true;
        video.addEventListener('playing', () => {
            if (firstplay)
                this.auto(video.duration * 1000);
            firstplay = false;
        });
    }
    pause() {
        this.pausedTimeout = new Timeout(() => {
            this.timeout?.pause();
            this.paused = true;
            this.activeThumb?.classList.add('paused');
            if (this.currentSlide instanceof HTMLVideoElement)
                this.currentSlide.pause();
        }, 300);
    }
    continue() {
        this.pausedTimeout?.clear();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
            this.activeThumb?.classList.remove('paused');
            if (this.currentSlide instanceof HTMLVideoElement)
                this.currentSlide.play();
        }
    }
    prev() {
        if (this.paused)
            return;
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    next() {
        if (this.paused)
            return;
        const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    addControls() {
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        prevBtn.innerText = 'Previous Slide';
        nextBtn.innerText = 'Next Slide';
        this.controls.appendChild(prevBtn);
        this.controls.appendChild(nextBtn);
        this.controls.addEventListener('pointerdown', () => this.pause());
        this.controls.addEventListener('pointerup', () => this.continue());
        prevBtn.addEventListener('pointerup', () => this.prev());
        nextBtn.addEventListener('pointerup', () => this.next());
    }
    addThumbItems() {
        const thumbContainer = document.createElement('div');
        thumbContainer.id = 'slide_thumb';
        for (let i = 0; i < this.slides.length; i++) {
            thumbContainer.innerHTML += `
        <span>
          <span class="thumb_item"></span>
        </span>
      `;
        }
        this.controls.appendChild(thumbContainer);
        this.thumbItems = Array.from(document.querySelectorAll('.thumb_item'));
    }
    init() {
        this.addControls();
        this.addThumbItems();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map