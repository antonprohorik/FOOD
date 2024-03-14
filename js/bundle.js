/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
       //CALC

  const result = document.querySelector('.calculating__result span');
  let sex,height, weight,age,ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
    }


  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent =Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function initLoclaSettings (selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if(elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLoclaSettings('#gender div', 'calculating__choose-item_active');
  initLoclaSettings('.calculating__choose_big div', 'calculating__choose-item_active');


  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
          } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
      }
  
      elements.forEach(elem => {
          elem.classList.remove(activeClass);
      });
  
      e.target.classList.add(activeClass);
  
      calcTotal();
      });
    });
  }


  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

        if (input.value.match(/\D/g)) {
          input.style.border = '1px solid red';
        } else {
          input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
          case 'height':
                height = +input.value;
                break;
          case 'weight':
                weight = +input.value;    
                break;  
          case 'age':
                  age = +input.value;    
                  break; 
        }
        calcTotal();
    });
  }

  getDinamicInformation('#height');
  getDinamicInformation('#weight');
  getDinamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

 function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes= classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
              this.element = 'menu__item';
              element.classList.add(this.element);
            } else {
              this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResoursce = async (url) => {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
    };

    //1way
    // getResoursce('http://localhost:3000/menu')
    // .then(data => {
    //   data.forEach(({img, altimg, title, descr, price}) => {
    //        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //   });
    // });


//axios
axios.get('http://localhost:3000/menu')
.then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {
           new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
});


// 2 way

    // getResoursce('http://localhost:3000/menu')
    //   .then(data => createCard(data));

    //   function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //       const element = document.createElement('div');

    //       element.classList.add('menu__item');

    //       element.innerHTML = `
    //           <div class="menu__item">
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //                 </div>
    //             </div>
    //       `;

    //       document.querySelector('.menu .container').append(element);
    //     });
    //   }
 }

 module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form () {
    //FORMS
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
      bindPostData(item);
    });

    const postData = async (url, data) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
      });

      return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('db.json')
      .then(data => data.json())
      .then(res => console.log(res));
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal () {
    //MODAL

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');

     function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
          }

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
    });


      function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }

      modalClose.addEventListener('click', closeModal);
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          closeModal();
        }
      });

      const modalTimerId = setTimeout(openModal, 7000);

      function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          openModal();
          window.removeEventListener('scroll', showModalByScroll);
        }
      }

      window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider () {
    // Slider 

  const slides = document.querySelectorAll('.offer__slide'),
  slider = document.querySelector('.offer__slider'),
  prev = document.querySelector('.offer__slider-prev'),
  next = document.querySelector('.offer__slider-next'),
  total = document.querySelector('#total'),
  current =  document.querySelector('#current'),
  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
  slidesField = document.querySelector('.offer__slider-inner'),
  width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';


  slides.forEach(slide => {
    slide.style.width = width;
  });


    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }

    function slideSwitch () {
      slidesField.style.transform = `translateX(-${offset}px)`;

      if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex -1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
    }

  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length -1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    slideSwitch();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length -1);
    } else {
      offset -= deleteNotDigits(width);
    }

    if (slideIndex ==1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    slideSwitch();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) =>{
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo-1);

      slideSwitch();
    });
  });

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    //TABS
    let tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

          function hideTabContent () {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
          }

          function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
          }

          hideTabContent();
          showTabContent();

          tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                         hideTabContent();
                         showTabContent(i);
                    }
                });
            }
          });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
         //TIMER

  const deadLine = '2024-12-15';

  function getTimeRemaining (endtime) {
    let days,hours,minutes,seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0 ) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 *60 *24)),
      hours = Math.floor((t / (1000*60*60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    }
    
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

updateClock();

          function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0 ) {
              clearInterval(timeInterval);
            }
          }
  }
  setClock('.timer', deadLine);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

  tabs();
  modal();
  timer();
  cards();
  calc();
  form();
  slider();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map