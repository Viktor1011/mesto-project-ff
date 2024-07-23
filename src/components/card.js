import { deleteCardPayload, putLikePayload, removeLikePayload } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, deleteCard, likeCard, popupCardImg, currentUser) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    
    cardImage.src = card.link;
    cardImage.alt = card.name;
    likeCount.textContent = +card.likes.length;

    const cardOwnerId = card.owner._id;
    
    if (cardOwnerId !== currentUser) { 
        deleteButton.classList.add('displaynone');
    };

    cardElement.querySelector('.card__title').textContent = card.name;
    
    deleteButton.addEventListener('click', function() {
        deleteCard(cardElement, card);
    })
    
    likeButton.addEventListener('click', function() {
        likeCard(likeButton, card, likeCount);
    });

    cardImage.addEventListener('click', function() {
        popupCardImg(card);
    })


    return cardElement;
}

export function deleteCard (cardElement, card) {
    deleteCardPayload(card)
    .then((card) => {
        cardElement.remove();
    })
    .catch((err) => {
        console.log(err)
    })
}

export function likeCard(likeButton, card, likeCount) {
    
    if (likeButton.classList.contains('card__like-button_is-active')) {
        removeLikePayload(card)
        .then((card) => {
            likeButton.classList.remove('card__like-button_is-active');
            console.log(likeButton.textContent);
            console.log(+card.likes.length);
            likeCount.textContent = +card.likes.length;
        })
        .catch((err) => {
            console.log(err)
        })
    } else {
        putLikePayload(card)
        .then((card) => {
            console.log(card);
            likeButton.classList.add('card__like-button_is-active');
            likeCount.textContent = +card.likes.length;
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
