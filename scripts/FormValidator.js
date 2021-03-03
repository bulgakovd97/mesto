//Объявление селекторов
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

class FormValidator {
    _formSelector;
    _inputSelector;
    _submitButtonSelector;
    _inactiveButtonClass;
    _inputErrorClass;
    _errorClass;
    _form;

    constructor(selectors, form) {
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._form = form;
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }
    
    enableValidation() {
        const formElement = document.getElementById(this._form);
        
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners(formElement);
    }
}

//Экспорт данных для валидации форм
export { config, FormValidator };