const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, deleteCard, likeCard, popupCardImg) {
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
        popupCardImg(card);
    })


    return cardElement;
}

export function deleteCard (cardElement) {
    cardElement.remove();
}

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}
