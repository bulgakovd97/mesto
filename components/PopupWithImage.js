import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
    }

    open(title, image) {
        super.open();

        this._viewTitle = this._popup.querySelector(".popup__title");
        this._viewImage = this._popup.querySelector(".popup__image");

        this._viewTitle.textContent = title;
        this._viewImage.src = image;
        this._viewImage.alt = title;
    }
}