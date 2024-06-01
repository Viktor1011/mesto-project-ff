const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popUpProfile = document.querySelector('.popup_type_edit');
const popUpCard = document.querySelector('.popup_type_new-card');
const cardImage = document.querySelectorAll('.card__image');
const popUpImage = document.querySelector('.popup_type_image');
const popup = document.querySelectorAll('.popup');

popUpProfile.classList.add('popup_is-animated');
popUpCard.classList.add('popup_is-animated');
popUpImage.classList.add('popup_is-animated');


// openModal

export function openModal(buttonEditProfile, buttonAdd) {
    buttonEditProfile.addEventListener('click', function () {
        popUpProfile.classList.add('popup_is-opened');
    })
    
    buttonAdd.addEventListener('click', function () {
        popUpCard.classList.add('popup_is-opened');
    })

    document.addEventListener('keydown', closeModalEsc)
}

buttonEditProfile.addEventListener('click', function () {
    popUpProfile.classList.add('popup_is-opened');
})

buttonAdd.addEventListener('click', function () {
    popUpCard.classList.add('popup_is-opened');
})


// closeModal

const buttonClose = document.querySelectorAll('.popup__close')

export function closeModal() {
    popUpCard.classList.remove('popup_is-opened');
    popUpProfile.classList.remove('popup_is-opened');
    popUpImage.classList.remove('popup_is-opened');
}

document.addEventListener('keydown', function(evt) {
        if (evt.key === 'Escape') {
            closeModal();
        }
        document.removeEventListener('keydown', function () {
            if (evt.key === 'Escape') {
                closeModal();
            }
        })
    })

    popup.forEach((popup) => {
    popup.addEventListener('click', evt => {
        if(evt.target === evt.currentTarget) {
            closeModal();
        }
    })
})

buttonClose.forEach((buttonClose) => {
    buttonClose.addEventListener('click', closeModal)
})
