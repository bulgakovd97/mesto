export default class Card {
    
    constructor(data, cardSelector, { handleCardClick }) {
        this._title = data.title;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    getCard() {
        this._element = this._getTemplate();

        this._cardTitle = this._element.querySelector(".card__title");
        this._cardImage = this._element.querySelector(".card__image");

        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");

        this._cardTitle.textContent = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;

        this._setEventListeners();
        
        return this._element;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
        
        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        this._deleteButton.addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        })
    }

    _likeCard(evt) {
        evt.target.classList.toggle("card__like-button_active");
    }

    _deleteCard(evt) {
        evt.target.closest(".card").remove();
    }
}