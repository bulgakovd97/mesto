import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input");
        this._errorList = this._form.querySelectorAll(".popup__error");
    }

    close() {
        super.close();

        this._form.reset();

        this._inputList.forEach((input) => {
            input.value = '';
            input.classList.remove("popup__input_type_error");
        })

        this._errorList.forEach((error) => {
            error.textContent = '';
            error.classList.remove("popup__error_visible");
        })
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());

            this.close();
        })
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        
        return this._formValues;
    }
}