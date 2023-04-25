import Slide from './Slide.js';
const slideContainer = document.getElementById('slide');
const slideElements = document.getElementById('slide_elements');
const slideControls = document.getElementById('slide_controls');
if (slideContainer && slideElements && slideElements.children.length && slideControls) {
    new Slide(slideContainer, [...slideElements.children], slideControls, 2000);
}
//# sourceMappingURL=script.js.map