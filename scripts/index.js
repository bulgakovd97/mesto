let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input_type_name');
let occupationInput = popup.querySelector('.popup__input_type_occupation');
let nameProfile = document.querySelector('.profile__name');
let occupationProfile = document.querySelector('.profile__occupation');
let formElement = popup.querySelector('.popup__form');

//Открытие попапа
let openPopup = () => {
    popup.classList.add('popup_opened');

    nameInput.value = nameProfile.textContent;
    occupationInput.value = occupationProfile.textContent;
};

//Закрытие попапа
let closePopup = () => {
    popup.classList.remove('popup_opened');
};

//Сохранение данных о новом пользователе
let handleFormSubmit = (event) => {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = occupationInput.value;

    closePopup();
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
        closePopup();
    };
});

formElement.addEventListener('submit', handleFormSubmit);