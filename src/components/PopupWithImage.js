import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._viewTitle = this._popup.querySelector(".popup__title");
        this._viewImage = this._popup.querySelector(".popup__image");
    }

    open(data) {
        super.open();

        this._viewTitle.textContent = data.name;
        this._viewImage.src = data.link;
        this._viewImage.alt = data.name;
    }
}