let editButton = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.edit-popup');
let editCloseButton = editPopup.querySelector('.edit-popup__close-button');
let nameInput = editPopup.querySelector('.edit-popup__input_type_name');
let occupationInput = editPopup.querySelector('.edit-popup__input_type_occupation');
let nameProfile = document.querySelector('.profile__name');
let occupationProfile = document.querySelector('.profile__occupation');
let editFormElement = editPopup.querySelector('.edit-popup__form');

//Открытие попапа
let openPopup = () => {
    editPopup.classList.add('edit-popup_opened');

    nameInput.value = nameProfile.textContent;
    occupationInput.value = occupationProfile.textContent;
};

//Закрытие попапа
let closePopup = () => {
    editPopup.classList.remove('edit-popup_opened');
};

//Сохранение данных о новом пользователе
let handleFormSubmit = (event) => {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = occupationInput.value;

    closePopup();
};

editButton.addEventListener('click', openPopup);
editCloseButton.addEventListener('click', closePopup);

editPopup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
        closePopup();
    };
});

editFormElement.addEventListener('submit', handleFormSubmit);