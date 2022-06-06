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

});