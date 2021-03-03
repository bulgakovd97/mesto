//Объявление глобальных переменных

//Массив начальных карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// //Содержимое шаблона карточки
// const cardTemplate = document.querySelector(".card-template").content;

//Контейнер для карточек
const cards = document.querySelector(".elements");

//Массив из всех попапов
const popups = Array.from(document.querySelectorAll(".popup"));

//Попап добавления карточки
const addPopup = document.querySelector(".popup_type_add");

//Попап редактирования профиля
const editPopup = document.querySelector(".popup_type_edit");

//Попап просмотра картинки
const viewPopup = document.querySelector(".popup_type_view");

//Кнопка "+"
const addButton = document.querySelector(".profile__add-button");

//Кнопка редактирования профиля
const editButton = document.querySelector(".profile__edit-button");

//Поле ввода "имя"
const nameInput = editPopup.querySelector('.popup__input_type_name');

//Поле ввода "Занятие"
const occupationInput = editPopup.querySelector('.popup__input_type_occupation');

//Имя в профиле
const nameProfile = document.querySelector('.profile__name');

//Занятие в профиле
const occupationProfile = document.querySelector('.profile__occupation');

//Форма попапа редактирования профиля
const editForm = editPopup.querySelector(".popup__form");

//Форма попапа добавления картинки
const addForm = addPopup.querySelector(".popup__form");

//Поле ввода "Название"
const titleInput = addPopup.querySelector(".popup__input_type_title");

//Поле вводе "Ссылка на картинку"
const linkInput = addPopup.querySelector(".popup__input_type_link");

//Фотография попапа просмотра картинки
const viewImage = viewPopup.querySelector(".popup__image");

//Подпись к фотографии попапа просмотра картинки
const viewTitle = viewPopup.querySelector(".popup__title");


//Действия с попапами (открытие/закрытие, обработка сабмитов)

//Открытие попапа
function openPopup(popup) {
    popup.classList.add("popup_opened");

    document.addEventListener('keyup', handleEscUp);
}

//Закрытие попапа
function closePopup(popup) {
    popup.classList.remove("popup_opened");

    document.removeEventListener('keyup', handleEscUp);
}

//Обработчик события клика по кнопке "+"
function setAddOpenListener() {
    addButton.addEventListener('click', () => {
        openPopup(addPopup);
        addForm.reset();
    })
}

//Обработчик события клика по кнопке редактирования профиля
function setEditOpenListener() {
    editButton.addEventListener('click', () => {
        openPopup(editPopup);

        nameInput.value = nameProfile.textContent;
        occupationInput.value = occupationProfile.textContent;
    })
}

//Обработчик событий кликов по оверлэю попапов и по кнопке "x"
function setCloseListener() {
    popups.forEach(function (popup) {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
                closePopup(popup);
            }
        })
    })
}

//Обработчик события кнопки Esc
function handleEscUp(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
} 

//Сохранение информации о новом пользователе в профиле
function handleEditSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = occupationInput.value;

    closePopup(editPopup);
}

//Обработчик события сохранения информации о новом пользователе
function setEditSubmitListener() {
    editForm.addEventListener('submit', handleEditSubmit);
}

function handleCardClick(title, image) {
    viewTitle.textContent = title;
    viewImage.src = image;
    viewImage.alt = title;

    openPopup(viewPopup);
}

//Открытие попапа добавления карточки
setAddOpenListener();

//Открытие попапа редактирования профиля
setEditOpenListener();

//Закрытие попапов добавления карточки и редактирования профиля при клике по оверлэю и по кнопке "x"
setCloseListener();

//Закрытие попапа редактирования профиля при клике на кнопку "Сохранить"
setEditSubmitListener();

//Импорт данных для создания карточек
import { Card } from './Card.js';

//Создание карточки
function createCard(title, image) {
    const card = new Card(title, image, '.card-template');

    const cardElement = card.getCard();

    return cardElement;
}

//Вставка в разметку карточки начального массива
const renderCard = (item) => {
    cards.append(createCard(item.name, item.link));
}

//Отображение карточек начального массива
const render = () => {
    initialCards.forEach((item) => {
        renderCard(item);
    })
}

//Вставка в разметку новой карточки
const addCard = () => {
    cards.prepend(createCard(titleInput.value, linkInput.value));
}

//Обработчик события клика по кнопке "Создать" попапа добавления карточки
const setAddSubmitListener = () => {
    addForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        addCard();

        closePopup(addPopup);
    })
}

//Вызов функции отображения карточек начального массива
render();

//Закрытие попапа добавления карточки при клике на кнопку "Создать"
setAddSubmitListener();

//Импорт данных для функции валидации форм
import { config, FormValidator } from './FormValidator.js';

//Функция валидации форм
const launchValidation = () => {
    const addFormValidator = new FormValidator(config, 'add-form');

    const editFormValidator = new FormValidator(config, 'edit-form');

    addFormValidator.enableValidation();
    editFormValidator.enableValidation();
}

//Запуск функции валидации форм
launchValidation();

export { cards, handleCardClick };