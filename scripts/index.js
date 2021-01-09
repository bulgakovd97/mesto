let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-button')
let nameInput = popup.querySelector('.popup__name')
let occupationInput = popup.querySelector('.popup__occupation')
let nameProfile = document.querySelector('.profile__name')
let occupationProfile = document.querySelector('.profile__occupation')

//Открытие попапа
let openPopup = () => {
    popup.classList.add('popup_opened')

    nameInput.value = nameProfile.textContent
    occupationInput.value = occupationProfile.textContent
}

editButton.addEventListener('click', openPopup)

//Закрытие попапа
let closePopup = () => {
    popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', closePopup)

popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup()
    }
})

//Сохранение данных о новом пользователе
let formElement = popup.querySelector('.popup__form')

let handleFormSubmit = (event) => {
    event.preventDefault();

    nameProfile.textContent = nameInput.value
    occupationProfile.textContent = occupationInput.value

    closePopup()
}

formElement.addEventListener('submit', handleFormSubmit)