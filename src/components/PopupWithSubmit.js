import Popup from './Popup.js';


export default class PopupWithSubmit extends Popup {
    
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector(".popup__form");
        this._buttonElement = this._popup.querySelector(".popup__button");
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleConfirmSubmit();
        })
    }

    setSubmitAction(handleConfirmSubmit) {
        this._handleConfirmSubmit = handleConfirmSubmit;
    }

    preremove(isLoading) {
        if (isLoading) {
            this._buttonElement.textContent = "Удаление...";
        } else {
            this._buttonElement.textContent = "Да";
        }
    }
}