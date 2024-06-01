const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, deleteCard, likeCard, cardPopUpImg) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = card.link;
    cardImage.alt = card.name;

    cardElement.querySelector('.card__title').textContent = card.name;
    
    deleteButton.addEventListener('click', function() {
        deleteCard(cardElement);
    })
    
    likeButton.addEventListener('click', function() {
        likeCard(likeButton);
    });

    cardImage.addEventListener('click', function() {
        cardPopUpImg(cardImage);
        popupImgSrc.src = card.link;
        popupImgSrc.alt = card.name;
        popupImgCaption.textContent = card.name;
    })


    return cardElement;
}

export function deleteCard (cardElement) {
    cardElement.remove();
}

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

const popupImg = document.querySelector('.popup_type_image');
const popupImgSrc = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption')


export function cardPopUpImg () {
    popupImg.classList.add('popup_is-opened');
}