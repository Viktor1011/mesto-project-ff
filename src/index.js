import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup, closeByEscape, closeByOverlay } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validity.js';
import { getInitialCards, getUserInfo, addCard, updateUserInfo, changeUserAva } from './components/api.js';

const placesList = document.querySelector('.places__list');
const formElement = document.forms['edit-profile'];
const cardElement = document.forms['new-place'];
const avaElement = document.forms['edit-ava'];
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
const popUpButton = document.querySelector('.popup__button');
const avaLinkInput = document.querySelector('.popup__input_type_ava')
popUpProfile.classList.add('popup_is-animated');
popUpCard.classList.add('popup_is-animated');
popUpImage.classList.add('popup_is-animated');
popUpAva.classList.add('popup_is-animated');

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.style.backgroundImage = (`url(${userInfo.avatar})`);
        console.log(userInfo.avatar);
        displayCards(initialCards, userInfo);
    })
    .catch((err) => {
        console.log(err)
    })

function displayCards (initialCards, userInfo) {
    initialCards.forEach((card) => {
        const currentUser = userInfo._id;
        const cardAppend = createCard(card, deleteCard, likeCard, popupCardImg, currentUser);
        const cardLikeButton = cardAppend.querySelector('.card__like-button');
        for (let i = 0; i < card.likes.length; i++) {
            if (card.likes[i]._id === currentUser) {
                cardLikeButton.classList.add('card__like-button_is-active')
            }
        }
        placesList.append(cardAppend);
    });
}

formElement.addEventListener('submit', handleFormSubmit);

avaElement.addEventListener('submit', handleChangeAva);

function handleCardAdd(evt) {
    evt.preventDefault();
    const newCardInputInfo = {
        "name": cardTitleInput.value,
        "link": cardLinkInput.value,
      };

    popUpButton.innerHTML = "Сохранение...";
    
    console.log(newCardInputInfo);

    addCard(newCardInputInfo)

    .then((data) => {
        const card = data;
        const currentUser = card.owner._id;
        const cardAddToArray = createCard(card, deleteCard, likeCard, popupCardImg, currentUser);
        placesList.prepend(cardAddToArray);

    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        popUpButton.innerHTML = "Сохранить";
    })
    closePopup(popUpCard);
    cardElement.reset();
}

function handleChangeAva(evt) {
    evt.preventDefault();
    const newUserAva = {
        "avatar": avaLinkInput.value
    }; 

    popUpButton.innerHTML = "Сохранение...";

    changeUserAva(newUserAva)
    .then((data) => {
        profileImage.style.backgroundImage = (`url(${data.avatar})`);
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        popUpButton.innerHTML = "Сохранить";
    })
    closePopup(popUpAva);
    avaElement.reset();
}

//https://solncesvet.ru/blog/wp-content/uploads/2023/04/3-13.jpg
//background-image: url(6666407ac3aa5af1d5de.jpg)
//https://solncesvet.ru/blog/wp-content/uploads/2023/04/1-10.jpg

cardElement.addEventListener('submit', handleCardAdd);

function popupCardImg(cardElement) {
    popupImgSrc.src = cardElement.link;
    popupImgSrc.alt = cardElement.name;
    popupImgCaption.textContent = cardElement.name;
    openPopup(popupImg);
}

buttonEditProfile.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formElement);
    openPopup(popUpProfile);
})

function handleFormSubmit (evt) {
    evt.preventDefault();

    popUpButton.innerHTML = "Сохранение...";

    const userInfoInput = {
        "name": nameInput.value,
        "about": jobInput.value,
    }
    updateUserInfo(userInfoInput)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        popUpButton.innerHTML = "Сохранить";
    })
    closePopup(popUpProfile);
}

buttonAdd.addEventListener("click", () => {
    clearValidation(cardElement);
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
    clearValidation(avaElement);
})

enableValidation();