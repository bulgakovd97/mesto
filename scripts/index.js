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

//Содержимое шаблона карточки
const cardTemplate = document.querySelector(".card-template").content;

//Контейнер для карточек
const cards = document.querySelector(".elements");

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

//Добавление/удаление классов попапов
function togglePopup(popup) {
    popup.classList.toggle("popup_opened");
}

//Обработчик события клика по кнопке "+"
function setAddOpenListener() {
    addButton.addEventListener('click', (evt) => {
        togglePopup(addPopup);
        addForm.reset();
    })
}

//Обработчик события клика по кнопке редактирования профиля
function setEditOpenListener() {
    editButton.addEventListener('click', (evt) => {
        togglePopup(editPopup);

        nameInput.value = nameProfile.textContent;
        occupationInput.value = occupationProfile.textContent;
    })
}

//Обработчик события клика по картинке (для просмотра картинки)
function setOpenViewImageListener(photo, title) {
    photo.addEventListener('click', (evt) => {
        togglePopup(viewPopup);

        viewTitle.textContent = title.textContent;
        viewImage.src = photo.src;
        viewImage.alt = title.textContent;
    })
}

//Обработчик событий кликов по оверлэю попапов и по кнопке "x"
function setCloseListener() {
    const popups = document.querySelectorAll(".popup");

    popups.forEach(function (popup) {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                togglePopup(popup);
            }
            if (evt.target.classList.contains("popup__close-button")) {
                togglePopup(popup);
            }
        })
    })
}

//Открытие попапов добавления карточки и редактирования профиля
function openPopup() {
    setAddOpenListener();
    setEditOpenListener();
}

//Закрытие попапов добавления карточки и редактирования профиля
function closePopup() {
    setCloseListener();
    setAddSubmitListener();
    setEditSubmitListener();
}

//Лайк карточки
function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_active");
}

//Удаление карточки
function deleteCard(evt) {
    evt.target.closest(".card").remove();
} 

//Сохранение информации о новом пользователе в профиле
function handleEditSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = occupationInput.value;

    togglePopup(editPopup);
}

//Обработчик события сохранения информации о новом пользователе
function setEditSubmitListener() {
    editForm.addEventListener('submit', handleEditSubmit);
}

//Получение карточки
function getCard(item) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");

    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    setOpenViewImageListener(cardImage, cardTitle);
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);

    return cardElement;
}

//Создание новой карточки
function handleAddSubmit(evt) {
    evt.preventDefault();

    const newItem = {};

    newItem.name = titleInput.value;
    newItem.link = linkInput.value;
    
    addCard(newItem);
    
    togglePopup(addPopup);
}

//Обработчик события клика по кнопке "Создать" попапа добавления картинки
function setAddSubmitListener() {
    addForm.addEventListener('submit', handleAddSubmit);
}

//Добавление новой карточки
function addCard(item) {
    cards.prepend(getCard(item));
}

//Добавление карточек в разметку
function renderCard(item) {
    cards.append(getCard(item));
}

//Отображение карточек
function render() {
    initialCards.forEach(renderCard);
}

//Вызов функции отображения карточек
render();

//Вызов функции открытия попапа
openPopup();

//Вызов функции закрытия попапа
closePopup();
