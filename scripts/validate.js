//Объявление селекторов
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//Показ ошибки при невалидном инпуте
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
}

//Скрытие ошибки при валидном инпуте
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = "";
}

//Проверка валидности инпута
function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

//Проверяем, есть ли невалидный инпут в массиве инпутов, и возвращаем его при наличии
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//Состояние кнопки submit
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
}

//Обработчик события ввода в input
function setEventLesteners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

//Запуск валидации
function enableValidation(selectors) {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        const fieldsetList = Array.from(formElement.querySelectorAll(".popup__form-set"));

        fieldsetList.forEach((fieldset) => {
            setEventLesteners(fieldset);
        })
    })
}

//Вызов функции запуска валидации
enableValidation(selectors);