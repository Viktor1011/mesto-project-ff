import '../src/index.css'
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup, closeByEscape, closeByOverlay } from './components/modal.js';
import { enableValidation, clearValidation, validationConfig } from './components/validity.js';
import { getInitialCards, getUserInfo, addCard, updateUserInfo, changeUserAva } from './components/api.js';
import { renderLoading } from './components/utils.js';

const placesList = document.querySelector('.places__list');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['edit-ava'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popUpProfile = document.querySelector('.popup_type_edit');
const popUpCard = document.querySelector('.popup_type_new-card');
const popUpAva = document.querySelector('.profile_type_ava');
const popupImg = document.querySelector('.popup_type_image');
const popupImgSrc = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close');
const popUpImage = document.querySelector('.popup_type_image');
const cardTitleInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const popupSubmitButton = document.querySelector('.popup__button'); 
const avaLinkInput = document.querySelector('.popup__input_type_ava');
popUpProfile.classList.add('popup_is-animated');
popUpCard.classList.add('popup_is-animated');
popUpImage.classList.add('popup_is-animated');
popUpAva.classList.add('popup_is-animated');

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.style.backgroundImage = (`url(${userInfo.avatar})`);
        displayCards(initialCards, userInfo);
    })
    .catch(console.error)

function displayCards (initialCards, userInfo) {
    initialCards.forEach((card) => {
        const currentUser = userInfo._id;
        const cardAppend = createCard(card, deleteCard, likeCard, handleImageClick, currentUser);
        /*
        const cardLikeButton = cardAppend.querySelector('.card__like-button');
        for (let i = 0; i < card.likes.length; i++) {
            if (card.likes[i]._id === currentUser) {
                cardLikeButton.classList.add('card__like-button_is-active');
            }
        }
            */
        placesList.append(cardAppend);
    });
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

avatarForm.addEventListener('submit', handleChangeAva);

function handleCardAdd(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;

    renderLoading(true, submitButton, 'Сохранить', 'Сохранение...');

    const newCardInputInfo = {
        "name": cardTitleInput.value,
        "link": cardLinkInput.value,
      };
    
    addCard(newCardInputInfo)
    .then((data) => {
        const card = data;
        const currentUser = card.owner._id;
        const cardAddToArray = createCard(card, deleteCard, likeCard, handleImageClick, currentUser);
        renderLoading(false, popupSubmitButton, 'Сохранить', 'Сохранение...')
        //popupSubmitButton.classList.remove('.popup__button_inactive');
        //popupSubmitButton.textContent = "Сохранить";
        placesList.prepend(cardAddToArray);
        closePopup(popUpCard);
        cardForm.reset();
    })
    .catch(console.error)
    .finally(() => {
        renderLoading(false, submitButton, 'Сохранить', 'Сохранение...')
    })
}

function handleChangeAva(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;

    renderLoading(true, submitButton, 'Сохранить', 'Сохранение...');

    const newUserAva = {
        "avatar": avaLinkInput.value
    }; 

    changeUserAva(newUserAva)
    .then((data) => {
        profileImage.style.backgroundImage = (`url(${data.avatar})`);
        popupSubmitButton.classList.remove('.popup__button_inactive');
        //renderLoading(false, submitButton, 'Сохранить', 'Сохранение...');
        closePopup(popUpAva);
        avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
        renderLoading(false, submitButton, 'Сохранить', 'Сохранение...');
    })
}

//https://solncesvet.ru/blog/wp-content/uploads/2023/04/3-13.jpg
//background-image: url(6666407ac3aa5af1d5de.jpg)
//https://solncesvet.ru/blog/wp-content/uploads/2023/04/1-10.jpg

cardForm.addEventListener('submit', handleCardAdd);

function handleImageClick(cardForm) {
    popupImgSrc.src = cardForm.link;
    popupImgSrc.alt = cardForm.name;
    popupImgCaption.textContent = cardForm.name;
    openPopup(popupImg);
}

buttonEditProfile.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openPopup(popUpProfile);
})

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    console.log(evt.submitter)

    renderLoading(true, submitButton, 'Сохранить', 'Сохранение...');

    const userInfoInput = {
        "name": nameInput.value,
        "about": jobInput.value,
    }
    updateUserInfo(userInfoInput)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        renderLoading(true, submitButton, 'Сохранить', 'Сохранение...');
        closePopup(popUpProfile);
    })
    .catch(console.error)
    .finally(() => {
        renderLoading(false, submitButton, 'Сохранить', 'Сохранение...');
    })
}

buttonAdd.addEventListener("click", () => {
    clearValidation(cardForm, validationConfig);
    openPopup(popUpCard);
})

buttonsClose.forEach((buttonsClose) => {
    buttonsClose.addEventListener('click', () => {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    })
})

profileImage.addEventListener('click', () => {
    openPopup(popUpAva);
    clearValidation(avatarForm, validationConfig);
})

enableValidation(validationConfig);

