import Timeout from './utils/Timeout.js';

export default class Slide {
  container;
  slides;
  controls;
  time;
  index: number;
  slide: Element;
  timeout: Timeout | null;
  paused: boolean;
  pausedTimeout: Timeout | null;

  constructor(container: Element, slides: Element[], controls: Element, time: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.slides[this.index];
    this.timeout = null;
    this.paused = false;
    this.pausedTimeout = null;

    this.init();
  }
  hide(el: Element) {
    el.classList.remove('active');
  }
  show(index: number) {
    this.index = index;
    this.slide = this.slides[index];
    this.slides.forEach((el) => this.hide(el));
    this.slides[index].classList.add('active');
    this.auto(this.time);
  }
  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
  }
  pause() {
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.paused = true;
    }, 300);
  }
  continue() {
    this.pausedTimeout?.clear();
    if (this.paused) {
      this.paused = false;
      this.timeout?.continue();
    }
  }
  prev() {
    if (this.paused) return;
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);
  }
  next() {
    if (this.paused) return;
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }
  private addControls() {
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
  private init() {
    this.addControls();
    this.show(this.index);
  }
}
