import './index.css';

import { initialCards, addButton, editButton, config } from '../utils/constants.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';


const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem, ".card-template", {
            handleCardClick: (title, image) => {
                popupWithImage.open(title, image);
            }
        });

        const cardElement = card.getCard();
        
        cardList.addItem(cardElement);
    }
}, ".elements");


const editPopupForm = new PopupWithForm(".popup_type_edit", { 
    handleFormSubmit: () => {
        userInfo.setUserInfo();
    } 
});


const addPopupForm = new PopupWithForm(".popup_type_add", { 
    handleFormSubmit: (formData) => {
        const newCard = new Card(formData, ".card-template", {
            handleCardClick: (title, image) => {
                popupWithImage.open(title, image);
            }
        });
        
        const newCardElement = newCard.getCard();
        
        cardList.addItem(newCardElement);
    } 
});


const popupWithImage = new PopupWithImage(".popup_type_view");


const userInfo = new UserInfo({
  nameSelector: ".profile__name", 
  occupationSelector: ".profile__occupation"
});


const addFormValidator = new FormValidator(config, 'add-form');

const editFormValidator = new FormValidator(config, 'edit-form');


editButton.addEventListener('click', () => {
  editPopupForm.open();
  userInfo.getUserInfo();
})


addButton.addEventListener('click', () => {
  addPopupForm.open();
})


editPopupForm.setEventListeners();
addPopupForm.setEventListeners();
popupWithImage.setEventListeners();


cardList.renderItems();


addFormValidator.enableValidation();
editFormValidator.enableValidation();