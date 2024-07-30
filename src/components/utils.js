export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
    if (isLoading) {
      button.textContent = loadingText
      button.classList.add('.popup__button_inactive')
    } else {
      button.textContent = buttonText
      button.classList.remove('.popup__button_inactive')
    }
  }