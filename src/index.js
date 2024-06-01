import { initialCards } from './cards.js'
import '../pages/index.css';
import { createCard, deleteCard, likeCard, cardPopUpImg } from './components/card.js';
import { closeModal, openModal } from './components/modal.js';

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
const nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileTitle.textContent;
jobInput.value =  profileDescription.textContent;

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal();
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
    closeModal();
}

cardElement.addEventListener('submit', handleCardAdd);

