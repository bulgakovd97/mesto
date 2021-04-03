const addButton = document.querySelector(".profile__add-button");

const editButton = document.querySelector(".profile__edit-button");

const avatarButton = document.querySelector(".profile__avatar-button");

const nameInput = document.querySelector(".popup__input_type_name");

const aboutInput = document.querySelector(".popup__input_type_about");

const avatarInput = document.querySelector(".popup__input_type_avatar");

const titleInput = document.querySelector(".popup__input_type_title");

const linkInput = document.querySelector(".popup__input_type_link");



const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '0e96852d-62c6-41f3-9055-b88bc0850f61',
    'Content-Type': 'application/json',
  },
}


export { addButton, editButton, avatarButton, nameInput, aboutInput, avatarInput, titleInput, linkInput, validationConfig, options };