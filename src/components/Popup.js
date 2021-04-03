export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonElement = this._popup.querySelector(".popup__button");
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");

        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");

        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup_opened")) {
                this.close();
            }
        })
    }

    preload(isLoading) {
        if (isLoading) {
            this._buttonElement.textContent = "Сохранение...";
        } else {
            this._buttonElement.textContent = "Сохранить";
        }
    }

    preremove(isLoading) {
        if (isLoading) {
            this._buttonElement.textContent = "Удаление...";
        } else {
            this._buttonElement.textContent = "Да";
        }
    }
}