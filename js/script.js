document.addEventListener('DOMContentLoaded', () => {

    // burger
    function burger({burger, burgerActiveClass, header, headerActiveClass, headerMenu, itemHeight, itemMarginBottom, headerMenuPaddingTopBottom, itemsClose}) {

        const itemsClose_ = document.querySelectorAll(itemsClose);
        const burger_ = document.querySelector(burger);
        const header_ = document.querySelector(header);
        const headerMenu_ = document.querySelector(headerMenu);
        const headerMenuItems = headerMenu_.firstElementChild.children;

        burger_.addEventListener('click', () => {
            burger_.classList.toggle(burgerActiveClass);
            header_.classList.toggle(headerActiveClass);
            if (burger_.classList.contains(burgerActiveClass)) {
                headerMenu_.style.height = itemHeight * headerMenuItems.length + itemMarginBottom * headerMenuItems.length - itemMarginBottom +  headerMenuPaddingTopBottom + 'px';
            } else {
                headerMenu_.style.height = 0 + 'px';
            }
        });

        itemsClose_.forEach(item => {
            item.addEventListener('click', () => {
                burger_.classList.remove(burgerActiveClass);
                header_.classList.remove(headerActiveClass);
                headerMenu_.style.height = 0 + 'px';
            });
        });

    }

    burger({
        burger: '.burger',
        burgerActiveClass: 'burger--active',
        header: '.header',
        headerActiveClass: 'header--active',
        headerMenu: '.header__menu',
        itemHeight: 28,
        itemMarginBottom: 25,
        headerMenuPaddingTopBottom: 50,
        itemsClose: '.header__menu__li'
    });

    // sound

    function sound(button, buttonActiveClass, video) {
        const button_ = document.querySelector(button);
        const video_ = document.querySelector(video);
        // video_.volume = 0;
        // video_.play();
        video_.onloadeddata = function() {
            video_.volume = 0;
            video_.play();
            button_.addEventListener('click', () => {
                video_.play();
                button_.classList.toggle(buttonActiveClass);
                if ( button_.classList.contains(buttonActiveClass)) {
                    video_.volume = 0.7;
                } else {
                    video_.volume = 0;
                }
            });
            // button_.click();
        };
        
        // await video_.play();

    }

    sound('.main__volume', 'main__volume--active', '.main__video-box video');

    // faq

    function faq(buttons, buttonActiveClass, contents) {
        const buttons_ = document.querySelectorAll(buttons);
        const contents_ = document.querySelectorAll(contents);

        buttons_.forEach((button, index) => {
            button.addEventListener('click', () => {
                button.classList.toggle(buttonActiveClass);

                contents_.forEach((content, index2) => {
                    if (index == index2) {
                        if (button.classList.contains(buttonActiveClass)) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        } else {
                            content.style.maxHeight = '0';
                        }
                    }
                });
            });
        });
    }

    faq('.faq__item__header', 'faq__item__header--active', '.faq__item__content');

    // Функция слайдера
    function slider({window, field, cards, cardWidth, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass, sliderName, sliderSlideName}) {
        const window_ = document.querySelector(window),
            field_ = document.querySelector(field),
            cards_ = document.querySelectorAll(cards),
            arrowPrev_ = document.querySelector(arrowPrev),
            arrowNext_ = document.querySelector(arrowNext),
            sliderName_ = document.querySelector(sliderName),
            sliderSlideName_ = document.querySelectorAll(sliderSlideName);

        let startPoint,
            swipeAction,
            endPoint,
            sliderCounter = 0,
            dots_ = [];

        // Устанавливаем фиксированную ширину поля слайдов

        field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
        // field_.style.marginLeft = '20px';
        // field_.style.marginRight = '20px';

        // Слайд следующий

        function slideNext() {
            sliderCounter++;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter >= cards_.length) {
                sliderCounter = cards_.length - 1;
            }
            if ((sliderCounter + 1) == cards_.length) {
                arrowNext_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                item.classList.remove(dotClassActive);
                if (index == sliderCounter) {
                    item.classList.add(dotClassActive);
                }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            if (sliderName_) {
            }
        }

        // Слайд предыдущий

        function slidePrev() {
            sliderCounter--;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter <= 0) {
                sliderCounter = 0;
            }
            if (sliderCounter == 0) {
                arrowPrev_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            if (sliderName_) {
            }
        }

        // Рендер точек

        if (dotsWrap) {
            const dotsWrap_ = document.querySelector(dotsWrap);
    
            cards_.forEach(() => {
                const dot = document.createElement('div');
                dot.classList.add(dotClass);
                dotsWrap_.appendChild(dot);
                dots_.push(dot);
            });
            dots_[0].classList.add(dotClassActive);
            dots_.forEach((item, index) => {
                item.addEventListener('click', () => {
                sliderCounter = index;
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter == 0) {
                    arrowPrev_.classList.add(arrowClass);
                }
                if ((sliderCounter + 1) == cards_.length) {
                    arrowNext_.classList.add(arrowClass);
                }
                dots_.forEach(item_ => {
                    item_.classList.remove(dotClassActive);
                });
                item.classList.add(dotClassActive);
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                });
            });
        }

        // Переключение на стрелки

        arrowPrev_.addEventListener('click', () => {
            slidePrev();
        });

        arrowNext_.addEventListener('click', () => {
            slideNext();
        });

        // Свайп слайдов тач-событиями

        window_.addEventListener('touchstart', (e) => {
            startPoint = e.changedTouches[0].pageX;
        });

        window_.addEventListener('touchmove', (e) => {
            swipeAction = e.changedTouches[0].pageX - startPoint;
            field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
        });

        window_.addEventListener('touchend', (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (Math.abs(startPoint - endPoint) > 50) {
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (endPoint < startPoint) {
                    slideNext();
                } else {
                    slidePrev();
                }
            } else {
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            }
        });
    }

    slider(
        {
            window: '.objects__window--buy',
            field: '.objects__field--buy',
            cards: '.objects__card--buy',
            cardWidth: 490,
            margin: 40,
            arrowPrev: '.objects__slider-button--left--buy',
            arrowNext: '.objects__slider-button--right--buy',
            arrowClass: 'objects__slider-button--inactive'
        }
    );
    slider(
        {
            window: '.objects__window--rent',
            field: '.objects__field--rent',
            cards: '.objects__card--rent',
            cardWidth: 490,
            margin: 40,
            arrowPrev: '.objects__slider-button--left--rent',
            arrowNext: '.objects__slider-button--right--rent',
            arrowClass: 'objects__slider-button--inactive'
        }
    );
    slider(
        {
            window: '.objects__window--rent--min',
            field: '.objects__field--rent--min',
            cards: '.objects__card--rent--min',
            cardWidth: 280,
            margin: 30,
            arrowPrev: '.objects__slider-button--left--rent--min',
            arrowNext: '.objects__slider-button--right--rent--min',
            arrowClass: 'objects__slider-button--inactive'
        }
    );
    slider(
        {
            window: '.objects__window--buy--min',
            field: '.objects__field--buy--min',
            cards: '.objects__card--buy--min',
            cardWidth: 280,
            margin: 30,
            arrowPrev: '.objects__slider-button--left--buy--min',
            arrowNext: '.objects__slider-button--right--buy--min',
            arrowClass: 'objects__slider-button--inactive'
        }
    );

    // tabs

    function tabs ({ tabsButtons, tabsContents, tabButtonsActiveClass, tabContentsActiveClass, linkButtons0, linkButtons1 }) {

        const tabsButtons_ = document.querySelectorAll(tabsButtons);
        const tabsContents_ = document.querySelectorAll(tabsContents);
        const linkButtons0_ = document.querySelectorAll(linkButtons0);
        const linkButtons1_ = document.querySelectorAll(linkButtons1);

        tabsButtons_.forEach((button, index1) => {
            button.addEventListener('click', () => {
                clearActiveClass(tabsButtons_, tabButtonsActiveClass);
                clearActiveClass(tabsContents_, tabContentsActiveClass);
                button.classList.add(tabButtonsActiveClass);

                tabsContents_[index1].classList.add(tabContentsActiveClass);

            });
        });
        linkButtons0_.forEach(item => {
            item.addEventListener('click', () => {
                clearActiveClass(tabsButtons_, tabButtonsActiveClass);
                clearActiveClass(tabsContents_, tabContentsActiveClass);
                tabsButtons_[0].classList.add(tabButtonsActiveClass);
                tabsContents_[0].classList.add(tabContentsActiveClass);
            });
        });
        linkButtons1_.forEach(item => {
            item.addEventListener('click', () => {
                clearActiveClass(tabsButtons_, tabButtonsActiveClass);
                clearActiveClass(tabsContents_, tabContentsActiveClass);
                tabsButtons_[1].classList.add(tabButtonsActiveClass);
                tabsContents_[1].classList.add(tabContentsActiveClass);
            });
        });

    }

    tabs({
        tabsButtons: '.objects__tabs__button',
        tabsContents: '.objects__tabs__content',
        tabButtonsActiveClass: 'objects__tabs__button--active',
        tabContentsActiveClass: 'objects__tabs__content--active',
        linkButtons0: '.header__link--buy',
        linkButtons1: '.header__link--rent'
    });

    function clearActiveClass(arr, activeClass) {
        arr.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    // modal

    function calcScroll() {
        let div = document.createElement('div');
      
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
      
        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
      
        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose, modalCloseAdd) {
        const triggers_ = document.querySelectorAll(triggers),
              modal_ = document.querySelector(modal),
              modalClose_ = document.querySelector(modalClose),
              modalCloseAdd_ = document.querySelector(modalCloseAdd);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });
            modalCloseAdd_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });
    
            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains(modal.replace(/\./, ''))) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal-obj', 'modal--active', '[data-modal]', '.modal-obj__close img', '.modal-obj__button');

    // slider and data in modal

    const data = {
        buy: {
            0: {
                img: [
                    'img/objects/buy/apartment1/img1.jpg',
                    'img/objects/buy/apartment1/img2.jpg',
                    'img/objects/buy/apartment1/img3.jpg',
                    'img/objects/buy/apartment1/img4.jpg',
                    'img/objects/buy/apartment1/img5.jpg',
                    'img/objects/buy/apartment1/img6.jpg',
                    'img/objects/buy/apartment1/img7.jpg',
                    'img/objects/buy/apartment1/img8.jpg',
                    'img/objects/buy/apartment1/img9.jpg',
                    'img/objects/buy/apartment1/img10.jpg',
                    'img/objects/buy/apartment1/img11.jpg',
                    'img/objects/buy/apartment1/img12.jpg',
                    'img/objects/buy/apartment1/img13.jpg',
                    'img/objects/buy/apartment1/img14.jpg',
                    'img/objects/buy/apartment1/img15.jpg',
                    'img/objects/buy/apartment1/img16.jpg',
                    'img/objects/buy/apartment1/img17.jpg',
                    'img/objects/buy/apartment1/img18.jpg',
                    'img/objects/buy/apartment1/img19.jpg',
                    'img/objects/buy/apartment1/img20.jpg',
                    'img/objects/buy/apartment1/img21.jpg'
                ],
                area: 'Квартира  150 м²',
                feature: [
                    'просторная квартира планировки 3+1 150 м2',
                    '7 этаж / 8 этажного дома',
                    'свежий ремонт (полностью обновленная квартира)',
                    'кухня (встроенная)',
                    'удобные светлые комнаты',
                    '2 балкона',
                    'отдельные ванна и туалет'
                ],
                text: '',
                location: [
                    'район кепез дюденбаши',
                    'сетевые супермаркеты и пекарня в шаговой доступности',
                    'удобная транспортная развязка',
                    'государственная школа'
                ],
                price: 'Цена: 1 350 000 тур.лир'
            },
            1: {
                img: [
                    'img/objects/buy/apartment2/img1.jpg',
                    'img/objects/buy/apartment2/img2.jpg',
                    'img/objects/buy/apartment2/img3.jpg',
                    'img/objects/buy/apartment2/img4.jpg',
                    'img/objects/buy/apartment2/img5.jpg',
                    'img/objects/buy/apartment2/img6.jpg',
                    'img/objects/buy/apartment2/img7.jpg',
                    'img/objects/buy/apartment2/img8.jpg',
                    'img/objects/buy/apartment2/img9.jpg',
                    'img/objects/buy/apartment2/img10.jpg',
                    'img/objects/buy/apartment2/img11.jpg',
                    'img/objects/buy/apartment2/img12.jpg',
                    'img/objects/buy/apartment2/img13.jpg',
                    'img/objects/buy/apartment2/img14.jpg',
                    'img/objects/buy/apartment2/img15.jpg',
                    'img/objects/buy/apartment2/img16.jpg',
                    'img/objects/buy/apartment2/img17.jpg',
                    'img/objects/buy/apartment2/img18.jpg',
                    'img/objects/buy/apartment2/img19.jpg',
                    'img/objects/buy/apartment2/img20.jpg',
                    'img/objects/buy/apartment2/img21.jpg'
                ],
                area: 'Квартира  165 м²',
                feature: [
                    '3+1 165 м2  дуплекс (+28 m2 с возможностью расширения)',
                    'отдельная кухня (встроенная)',
                    'удобные светлые комнаты',
                    'гардеробная',
                    '2 балкона и терраса',
                    'природный газ у двери',
                    'на всех окнах жалюзи и москитные сетки',
                    'система сигнализации',
                    'видео-диафон'
                ],
                text: '<strong>Нижняя подсекция:</strong> холл, гостиная, кухня, ванная комната, раздельный туалет,  балкон. <br> <strong>Верхняя подсекция:</strong>  спальня, детская комната, балкон, терраса с видом на лесополосу.',
                location: [
                    'район кепез кютюкчю',
                    'центральное расположение',
                    'вдоль центральной дороги и канала',
                    'близость к кепезкому военному филиалу',
                    'стороны : восток / юг / север',
                    'сетевые супермаркеты и пекарня',
                    'торговый центр тахтакале',
                    'государственные школы',
                    'районный рынок'
                ],
                price: 'Цена: 1 450 000 тур.лир'
            },
            2: {
                img: [
                    'img/objects/buy/apartment3/img1.jpg',
                    'img/objects/buy/apartment3/img2.jpg',
                    'img/objects/buy/apartment3/img3.jpg',
                    'img/objects/buy/apartment3/img4.jpg',
                    'img/objects/buy/apartment3/img5.jpg',
                    'img/objects/buy/apartment3/img6.jpg',
                    'img/objects/buy/apartment3/img7.jpg',
                    'img/objects/buy/apartment3/img8.jpg',
                    'img/objects/buy/apartment3/img9.jpg',
                    'img/objects/buy/apartment3/img10.jpg',
                    'img/objects/buy/apartment3/img11.jpg',
                    'img/objects/buy/apartment3/img12.jpg',
                    'img/objects/buy/apartment3/img13.jpg',
                    'img/objects/buy/apartment3/img14.jpg',
                    'img/objects/buy/apartment3/img15.jpg',
                    'img/objects/buy/apartment3/img16.jpg',
                    'img/objects/buy/apartment3/img17.jpg',
                    'img/objects/buy/apartment3/img18.jpg',
                    'img/objects/buy/apartment3/img19.jpg',
                    'img/objects/buy/apartment3/img20.jpg',
                    'img/objects/buy/apartment3/img21.jpg',
                    'img/objects/buy/apartment3/img22.jpg'
                ],
                area: 'Квартира  160 м²',
                feature: [
                    '4+1 160 м2 садовый дуплекс (двухэтажная квартира на первом этаже с выходом в сад)',
                    'верхняя подсекция: холл, гостиная, кухня, ванная комната, балкон (84 м2)',
                    'нижняя подсекция:  2 спальни, детская, ванная комната (76 м2)',
                    'при желании можно разделить на две квартиры',
                    'гардеробная',
                    'отдельная кухня и удобные светлые комнаты',
                    'две отдельные ванные комнаты, гардероб, термосифон',
                    'открытая парковка',
                    'природный газ в доме'
                ],
                text: '',
                location: [
                    'район муратпаша енигюн',
                    'центральное расположение',
                    'марканталья - 10 мин',
                    'стороны : восток / запад / север',
                    'сетевые супермаркеты',
                    'пекарня',
                    'образовательные заведения',
                    'районный рынок',
                    'больница',
                    'центральная дорога'
                ],
                price: 'Цена: 2 550 000 тур.лир'

            }
        },
        rent: {
            0: {
                img: [
                    'img/objects/rent/apartment1/img1.jpg',
                    'img/objects/rent/apartment1/img2.jpg',
                    'img/objects/rent/apartment1/img3.jpg',
                    'img/objects/rent/apartment1/img4.jpg',
                ],
                area: 'Квартира  160 м²',
                feature: [
                    'просторная квартира планировки 1+1 45 м2',
                    'полностью меблированная (в наличие все необходимое для комфортного проживания)',
                    'американская кухня',
                    'удобные светлые комнаты',
                    'кондиционер'
                ],
                text: '6.000 тур.лир + 6.000 тур. лир депозит + 6.000 тур. лир комиссионные',
                location: [
                    'район муратпаша кызыларык',
                    'сетевые супермаркеты и пекарня в шаговой доступности',
                    'удобная транспортная развязка',
                    'государственная школа',
                    'близость к марканталии',
                    'недалеко от центра города',
                    'больница'
                ],
                price: 'Цена: 18 000 тур.лир'

            }
        }
    };

    function anim(element) {
        let startAnimation = null;

        const step = (timestamp) => {
            if (!startAnimation) startAnimation = timestamp;
            let progress = timestamp - startAnimation;
            element.style.opacity = progress/500;
            if (progress < 500) {
                window.requestAnimationFrame(step);
            }
        }
    
        window.requestAnimationFrame(step);
        startAnimation = null;
    }

    function sliderModal({_triggers, _arrowLeft, _arrowRight, _iamges, _area, _feature, _text, _location, _price, _field, _slider}) {
        const triggers_ = document.querySelectorAll(_triggers);
        const iamges_ = document.querySelectorAll(_iamges);
        const area_ = document.querySelector(_area);
        const feature_ = document.querySelector(_feature);
        const text_ = document.querySelector(_text);
        const location_ = document.querySelector(_location);
        const price_ = document.querySelector(_price);
        const arrowLeft_ = document.querySelector(_arrowLeft);
        const arrowRight_ = document.querySelector(_arrowRight);
        const field_ = document.querySelector(_field);
        const slider_ = document.querySelector(_slider);

        triggers_.forEach((trigger, index) => {
            trigger.addEventListener('click', () => {
                const category = trigger.getAttribute('data-cat');
                const arr = data[category][index].img.slice();

                iamges_.forEach((img, index2) => {
                    img.setAttribute('src', arr[index2]);
                });

                field_.innerHTML = "";
                data[category][index].img.forEach(item => {
                    field_.insertAdjacentHTML('beforeend', 
                    `
                    <div class="modal-obj__card">
                        <img src=${item} alt="apartment">
                    </div>
                    `)
                });

                area_.textContent = data[category][index].area;

                feature_.innerHTML = "";
                data[category][index].feature.forEach(item => {
                    feature_.insertAdjacentHTML('beforeend', `<li class="modal-obj__li modal-obj__text">${item}</li>`)
                });

                text_.innerHTML = '';
                text_.innerHTML = data[category][index].text;

                location_.innerHTML = "";
                data[category][index].location.forEach(item => {
                    location_.insertAdjacentHTML('beforeend', `<li class="modal-obj__li modal-obj__text">${item}</li>`)
                });

                price_.textContent = data[category][index].price;


                arrowRight_.addEventListener('click', () => {
                    anim(slider_);
                    arr.push(arr.shift());
                    iamges_.forEach((img, index2) => {
                        img.setAttribute('src', arr[index2]);
                    });
                });
                arrowLeft_.addEventListener('click', () => {
                    anim(slider_);
                    arr.unshift(arr.pop());
                    iamges_.forEach((img, index2) => {
                        img.setAttribute('src', arr[index2]);
                    });
                });

                // console.log(data[category][index].img);
            });
        });
    }

    sliderModal({
        _triggers: '[data-more1]',
        _iamges: '.modal-obj__img img',
        _area: '.modal-obj__area',
        _feature: '.modal-obj__ul--feature',
        _text: '.modal-obj__add',
        _location: '.modal-obj__ul--location',
        _price: '.modal-obj__price',
        _arrowLeft: '.modal-obj__arrow--left',
        _arrowRight: '.modal-obj__arrow--right',
        _field: '.modal-obj__field',
        _slider: '.modal-obj__slider'
    })
    sliderModal({
        _triggers: '[data-more2]',
        _iamges: '.modal-obj__img img',
        _area: '.modal-obj__area',
        _feature: '.modal-obj__ul--feature',
        _text: '.modal-obj__add',
        _location: '.modal-obj__ul--location',
        _price: '.modal-obj__price',
        _arrowLeft: '.modal-obj__arrow--left',
        _arrowRight: '.modal-obj__arrow--right',
        _field: '.modal-obj__field',
        _slider: '.modal-obj__slider'
    })
    sliderModal({
        _triggers: '[data-more3]',
        _iamges: '.modal-obj__img img',
        _area: '.modal-obj__area',
        _feature: '.modal-obj__ul--feature',
        _text: '.modal-obj__add',
        _location: '.modal-obj__ul--location',
        _price: '.modal-obj__price',
        _arrowLeft: '.modal-obj__arrow--left',
        _arrowRight: '.modal-obj__arrow--right',
        _field: '.modal-obj__field',
        _slider: '.modal-obj__slider'
    })
    sliderModal({
        _triggers: '[data-more4]',
        _iamges: '.modal-obj__img img',
        _area: '.modal-obj__area',
        _feature: '.modal-obj__ul--feature',
        _text: '.modal-obj__add',
        _location: '.modal-obj__ul--location',
        _price: '.modal-obj__price',
        _arrowLeft: '.modal-obj__arrow--left',
        _arrowRight: '.modal-obj__arrow--right',
        _field: '.modal-obj__field',
        _slider: '.modal-obj__slider'
    })

});