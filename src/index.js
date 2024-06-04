import { initialCards } from './cards.js'
import '../pages/index.css';
import { createCard, deleteCard, likeCard} from './components/card.js';
import { openPopup, closePopup, closeByEscape, closeByOverlay } from './components/modal.js';

const placesList = document.querySelector('.places__list');

function displayCards () {
    initialCards.forEach((card) => {
        const cardAppend = createCard(card, deleteCard, likeCard, cardPopUpImg);
        placesList.append(cardAppend);
    });
}

displayCards();

// ОБРАБОТЧИК ФОРМЫ ПРОФИЛЯ

const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popUpProfile = document.querySelector('.popup_type_edit');
const popUpCard = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
const popupImgSrc = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popUpProfile);
    console.log('works')
}

formElement.addEventListener('submit', handleFormSubmit);

// ДОБАВЛЯЕМ КАРТОЧКУ
const cardElement = document.forms['new-place'];

const cardTitleAdd = document.querySelector('.popup__input_type_card-name')
const cardLinkAdd = document.querySelector('.popup__input_type_url') 


function handleCardAdd(evt) {
    evt.preventDefault();

    const result = createCard({ name: cardTitleAdd.value, link: cardLinkAdd.value }, deleteCard, likeCard, cardPopUpImg);

    placesList.prepend(result);
    cardElement.reset();
    closePopup(popUpCard);
    console.log('works')
}

cardElement.addEventListener('submit', handleCardAdd);

function cardPopUpImg(cardElement) {
    popupImgSrc.src = cardElement.link;
    popupImgSrc.alt = cardElement.name;
    popupImgCaption.textContent = cardElement.name;
    openPopup(popupImg);
}

buttonEditProfile.addEventListener("click", () => {
    openPopup(popUpProfile);
})

buttonAdd.addEventListener("click", () => {
    openPopup(popUpCard);
})