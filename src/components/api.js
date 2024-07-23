//import { get } from "jquery";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
    headers: {
      authorization: '87ea7903-2461-4e8a-bd75-d0fee5cb0ac1',
      'Content-Type': 'application/json'
    }
  }

function getResponse(res) {
  if (res.ok) {
    return res.json();
    }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(getResponse);
    }

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
    .then(getResponse);
}

export const addCard = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard)
      })
    .then(getResponse);
}

export const updateUserInfo = (updateUser) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(updateUser)
    })
    .then(getResponse);
}

export const deleteCardPayload = (card) => {
  const cardId = card._id;
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse);
}

export const putLikePayload = (card) => {
  const cardId = card._id;
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponse);
}

export const removeLikePayload = (card) => {
  const cardId = card._id;
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse);
}

export const changeUserAva = (avaLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avaLink)
  })
  .then(getResponse);
}