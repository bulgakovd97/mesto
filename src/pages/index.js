import './index.css';

import { addButton, editButton, avatarButton, nameInput, aboutInput, validationConfig, options } from '../utils/constants.js';

import { createCard } from '../utils/utils.js';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';


const api = new Api(options);

const cardList = new Section({
    renderer: (cardItem) => {
        const cardElement = createCard(cardItem);

        cardList.addItem(cardElement);
    }
}, ".elements");

const userInfo = new UserInfo({
    nameSelector: ".profile__name", 
    aboutSelector: ".profile__about",
    avatarSelector: ".profile__avatar",
});

let userId = null;


api.getInitialData()
    .then(data => {
        const [userData, cardsData] = data;
        userId = userData._id;
        
        userInfo.setUserInfo(userData);
        cardList.renderItems(cardsData);
    })
    .catch(err => console.log('Ошибка загрузки страницы - ' + err))


const editPopupForm = new PopupWithForm(".popup_type_edit", { 
    handleFormSubmit: () => {
        editPopupForm.preload(true);

        api.setUserInfo()
            .then(data => {
                userInfo.setUserInfo(data);
            })
            .catch(err => console.log('Невозможно изменить данные пользователя - ' + err))
        
        editPopupForm.preload(false);
    } 
});


const addPopupForm = new PopupWithForm(".popup_type_add", { 
    handleFormSubmit: () => {
        addPopupForm.preload(true);

        api.addCard()
            .then(card => {
                const cardElement = createCard(card);

                cardList.addItem(cardElement);
            })
            .catch(err => console.log('Ошибка добавления новой карточки - ' + err))
        
        addPopupForm.preload(false);
    } 
});
    

const avatarPopupForm = new PopupWithForm(".popup_type_avatar", {
    handleFormSubmit: () => {
        avatarPopupForm.preload(true);

        api.changeAvatar()
            .then(data => {
                userInfo.setUserAvatar(data);
            })
            .catch(err => console.log('Ошибка загрузки аватара - ' + err))
        
        avatarPopupForm.preload(false);
    }
});


const popupWithImage = new PopupWithImage(".popup_type_view");

const popupConfirm = new PopupWithSubmit(".popup_type_confirm");


editButton.addEventListener('click', () => {
    editFormValidator.cleanErrors();
    editFormValidator.disableSubmitButton();
    
    editPopupForm.open();

    const userData = userInfo.getUserInfo();
    
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
})


addButton.addEventListener('click', () => {
    addFormValidator.cleanErrors();
    addFormValidator.disableSubmitButton();
    addPopupForm.open();
})

avatarButton.addEventListener('click', () => {
    avatarFormValidator.cleanErrors();
    avatarFormValidator.disableSubmitButton();

    avatarPopupForm.open();
})


editPopupForm.setEventListeners();
addPopupForm.setEventListeners();
avatarPopupForm.setEventListeners();
popupConfirm.setEventListeners();
popupWithImage.setEventListeners();


const addFormValidator = new FormValidator(validationConfig, 'add-form');

const editFormValidator = new FormValidator(validationConfig, 'edit-form');

const avatarFormValidator = new FormValidator(validationConfig, 'avatar-form');


addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();


export { popupWithImage, popupConfirm, api, userId };