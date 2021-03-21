import './index.css';

import { initialCards, addButton, editButton, nameInput, occupationInput, config } from '../utils/constants.js';

import createCard from '../utils/utils.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';


const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const cardElement = createCard(cardItem);

        cardList.addItem(cardElement);
    }
}, ".elements");


const editPopupForm = new PopupWithForm(".popup_type_edit", { 
    handleFormSubmit: ({ name, occupation }) => {
        userInfo.setUserInfo(name, occupation);
    } 
});


const addPopupForm = new PopupWithForm(".popup_type_add", { 
    handleFormSubmit: (formData) => {
        const newCardElement = createCard(formData);

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
    editFormValidator.cleanErrors();
    editFormValidator.disableSubmitButton();
    
    editPopupForm.open();

    const userData = userInfo.getUserInfo();
    
    nameInput.value = userData.name;
    occupationInput.value = userData.occupation;
})


addButton.addEventListener('click', () => {
    addFormValidator.cleanErrors();
    addFormValidator.disableSubmitButton();
    addPopupForm.open();
})


editPopupForm.setEventListeners();
addPopupForm.setEventListeners();
popupWithImage.setEventListeners();


cardList.renderItems();


addFormValidator.enableValidation();
editFormValidator.enableValidation();


export { popupWithImage };