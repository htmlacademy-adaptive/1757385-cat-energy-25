// burger menu
let navButton = document.querySelector('.main-nav__toggle');
let navMain = document.querySelector('.main-nav');
let headerMain = document.querySelector('.main-header');
let body = document.querySelector('.page__body');

headerMain.classList.remove('no-js');

navButton.addEventListener('click', function () {
  navMain.classList.toggle('main-nav--opened');
  body.classList.toggle('page__body--scroll-lock');
});

var isMobile = window.innerWidth < 768;

//slider example
function SliderExample(slider) {
  this.sliderEl = slider;
  this.barEl = slider.querySelector('.slider-example__bar');
  this.pointerEl = slider.querySelector('.slider-example__pointer');
  this.buttonBefore = slider.querySelector('#button-before');
  this.buttonAfter = slider.querySelector('#button-after');
  this.slideBefore = slider.querySelector('.slider-example__item--before');
  this.slideAfter = slider.querySelector('.slider-example__item--after');

  this.pointerPos = 0;
  this.pointerMinPos = 0;   //bar border and left -13px
  this.pointerMaxPos = 100;
  this.sliderWidth = slider.offsetWidth;

  this.barStartX = Math.round(this.barEl.getBoundingClientRect().x) + 5;
  this.barEndX = Math.round(this.barEl.getBoundingClientRect().x) + this.barEl.offsetWidth - 5;
  this.barWidth = this.barEl.offsetWidth - 10;

  this.blockBarEvents = false;

  this.sliderState = {
    before: false,
    after: true
  };

  if (isMobile) {
    this.switch = function(sliderState) {
      if (sliderState) {
        this.pointerEl.classList.add('slider-example__pointer--after');
        this.slideAfter.classList.add('slider-example__item--current');
        this.slideBefore.classList.remove('slider-example__item--current');
      }
      else {
        this.pointerEl.classList.remove('slider-example__pointer--after');
        this.slideBefore.classList.add('slider-example__item--current');
        this.slideAfter.classList.remove('slider-example__item--current');
      }
    }

    this.barClickedHandler = this.onclickmobile.bind(this);
    this.buttonBeforeHandler = this.onbeforeclickedmobile.bind(this);
    this.buttonAfterHandler = this.onafterclickedmobile.bind(this);

    this.barEl.addEventListener('click', this.barClickedHandler);
    this.buttonBefore.addEventListener('click', this.buttonBeforeHandler);
    this.buttonAfter.addEventListener('click', this.buttonAfterHandler);
  }
  else {
  //newPos in percentage 0 - this.pointerMaxPos
    this.moveTo = function(newPos) {
      this.pointerPos = newPos;

      if (this.pointerPos < this.pointerMinPos)
        this.pointerPos = this.pointerMinPos;
      else if (this.pointerPos > this.pointerMaxPos)
        this.pointerPos = this.pointerMaxPos;

      this.pointerEl.style.left = this.pointerPos * this.barWidth / this.pointerMaxPos - 13 + 'px';
      this.renderSlides();
    }

    this.renderSlides = function() {
      let divLine = Math.round(this.sliderWidth * this.pointerPos / this.pointerMaxPos);
      this.sliderEl.style.setProperty("--slider-value", divLine + 'px');
    }

    this.move = function(offset) {
      this.moveTo(this.pointerPos + offset);
    }

    this.pointerCapturedHandler = this.onmousedown.bind(this);
    this.pointerReleasedHandler = this.onmouseup.bind(this);
    this.pointerMovedHandler = this.onmousemove.bind(this);
    this.barClickedHandler = this.onclick.bind(this);
    this.keydownHandler = this.onkeydown.bind(this);
    this.buttonBeforeHandler = this.onbeforeclicked.bind(this);
    this.buttonAfterHandler = this.onafterclicked.bind(this);

    this.pointerEl.addEventListener('mousedown', this.pointerCapturedHandler);
    this.barEl.addEventListener('click', this.barClickedHandler);
    this.pointerEl.addEventListener('keydown', this.keydownHandler);
    this.buttonBefore.addEventListener('click', this.buttonBeforeHandler);
    this.buttonAfter.addEventListener('click', this.buttonAfterHandler);

    this.moveTo(50);
  }
}

SliderExample.prototype.onmousedown = function(event) {
  this.dragStart = this.pointerPos;
  this.pointerDownX = event.pageX;

  window.addEventListener('mousemove', this.pointerMovedHandler);
  window.addEventListener('mouseup', this.pointerReleasedHandler);
  this.blockBarEvents = true;
}

SliderExample.prototype.onmouseup = function(event) {
  window.removeEventListener('mousemove', this.pointerMovedHandler);
  window.removeEventListener('mouseup', this.pointerReleasedHandler);
  setTimeout(() => this.blockBarEvents = false, 300);
}

SliderExample.prototype.onmousemove = function(event) {
  let distance = (event.pageX - this.pointerDownX) / this.barWidth * this.pointerMaxPos;
  this.moveTo(this.dragStart + distance);
}

SliderExample.prototype.onclick = function(event) {
  if (this.blockBarEvents)
    return;
  let distance = (event.pageX - this.barStartX) / this.barWidth * this.pointerMaxPos;
  this.moveTo(distance);
}

SliderExample.prototype.onkeydown = function(event) {
  if(event.code == 'ArrowRight')
    this.move(5);
  else if (event.code == 'ArrowLeft')
    this.move(-5);
  else
    return;
}

SliderExample.prototype.onbeforeclicked = function(event) {
  this.moveTo(this.pointerMaxPos);
}

SliderExample.prototype.onafterclicked = function(event) {
  this.moveTo(this.pointerMinPos);
}

SliderExample.prototype.onafterclickedmobile = function (event) {
  this.switch(this.sliderState.after);
}

SliderExample.prototype.onbeforeclickedmobile = function (event) {
  this.switch(this.sliderState.before);
}

SliderExample.prototype.onclickmobile = function (event) {
  if(event.pageX > this.barEl.getBoundingClientRect().x + this.barEl.offsetWidth / 2) {
    this.switch(this.sliderState.after);
  } else {
    this.switch(this.sliderState.before);
  }
}

let sliderExampleEl = document.querySelector('.slider-example');

if(sliderExampleEl) {
  let sliderExample = new SliderExample(sliderExampleEl);
}
