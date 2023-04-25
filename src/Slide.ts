export default class Slide {
  container;
  slides;
  controls;
  time;
  index: number;
  slide: Element;

  constructor(container: Element, slides: Element[], controls: Element, time: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.slides[this.index];

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
  }
  prev() {
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);
  }
  next() {
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

    prevBtn.addEventListener('pointerup', () => this.prev());
    nextBtn.addEventListener('pointerup', () => this.next());
  }
  private init() {
    this.addControls();
    this.show(this.index);
  }
}
