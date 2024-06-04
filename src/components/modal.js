
const popUpProfile = document.querySelector('.popup_type_edit');
const popUpCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
popUpProfile.classList.add('popup_is-animated');
popUpCard.classList.add('popup_is-animated');
popUpImage.classList.add('popup_is-animated');

//----------------------Работа наш ошибками

//----создаем openPopup

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
    popup.addEventListener('click', closeByOverlay);
}

//----создаем closePopup

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    popup.removeEventListener('click', closeByOverlay);
}

//----закрываем через Esc

export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}  

//----закрываем через overlay

export function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

//----
const buttonsClose = document.querySelectorAll('.popup__close')

buttonsClose.forEach((buttonsClose) => {
    buttonsClose.addEventListener('click', () => {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    })
})

