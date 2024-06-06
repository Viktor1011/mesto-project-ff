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
        closePopup(evt.target);
    } 
}
