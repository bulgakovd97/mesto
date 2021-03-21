export default class FormValidator {

    constructor(selectors, form) {
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._formElement = document.getElementById(form);
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._errorList = Array.from(this._formElement.querySelectorAll(".popup__error"));
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
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }

    _setEventListeners(formElement) {
        this._toggleButtonState(this._inputList, this._buttonElement);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            })
        })
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    cleanErrors() {
        this._inputList.forEach((input) => {
            input.value = '';
            input.classList.remove(this._inputErrorClass);
        })

        this._errorList.forEach((error) => {
            error.textContent = '';
            error.classList.remove(this._errorClass);
        })
    }
    
    enableValidation() {
        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners(this._formElement);
    }
}