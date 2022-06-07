document.addEventListener('DOMContentLoaded', () => {

    // burger
    function burger({burger, burgerActiveClass, header, headerActiveClass, headerMenu, itemHeight, itemMarginBottom, headerMenuPaddingTopBottom}) {

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

    }

    burger({
        burger: '.burger',
        burgerActiveClass: 'burger--active',
        header: '.header',
        headerActiveClass: 'header--active',
        headerMenu: '.header__menu',
        itemHeight: 28,
        itemMarginBottom: 25,
        headerMenuPaddingTopBottom: 50
    });

    // sound

    function sound(button, buttonActiveClass, video) {
        const button_ = document.querySelector(button);
        const video_ = document.querySelector(video);

        video_.volume = 0;
        button_.addEventListener('click', () => {
            button_.classList.toggle(buttonActiveClass);
            if ( button_.classList.contains(buttonActiveClass)) {
                video_.volume = 0.7;
            } else {
                video_.volume = 0;
            }
        });
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
                            console.log(content.scrollHeight);
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

    function tabs ({ tabsButtons, tabsContents, tabButtonsActiveClass, tabContentsActiveClass }) {

        const tabsButtons_ = document.querySelectorAll(tabsButtons);
        const tabsContents_ = document.querySelectorAll(tabsContents);

        tabsButtons_.forEach((button, index1) => {
            button.addEventListener('click', () => {
                clearActiveClass(tabsButtons_, tabButtonsActiveClass);
                clearActiveClass(tabsContents_, tabContentsActiveClass);
                button.classList.add(tabButtonsActiveClass);

                tabsContents_.forEach((content, index2) => {
                    if (index1 === index2) {
                        content.classList.add(tabContentsActiveClass);
                    }
                });

            });
        });

    }

    tabs({
        tabsButtons: '.objects__tabs__button',
        tabsContents: '.objects__tabs__content',
        tabButtonsActiveClass: 'objects__tabs__button--active',
        tabContentsActiveClass: 'objects__tabs__content--active'
    });

    function clearActiveClass(arr, activeClass) {
        arr.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

});