export default class Card {
    
    constructor({ data, userId, handleCardClick, handleLikeClick, handleDeleteClick }, api, cardSelector) {
        this._data = data;
        this._title = data.name;
        this._image = data.link;
        this._owner = data.owner;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._api = api;
        this._cardSelector = cardSelector;
    }

    getCard() {
        this._element = this._getTemplate();

        this._cardTitle = this._element.querySelector(".card__title");
        this._cardImage = this._element.querySelector(".card__image");

        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._likeCounter = this._element.querySelector(".card__like-counter");

        this._cardTitle.textContent = this._title;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;

        this.setLikeCount(this._data);

        this.checkLike();
        
        this._setEventListeners();

        this._checkDeleteIcon();
        
        return this._element;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        
        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this);
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick(this._element);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._data);
        })
    }

    _checkDeleteIcon() {
        if (this._userId === this._owner._id) {
            this._deleteButton.classList.add("card__delete-button_visible");
        }
    }

    setLikeCount(data) {
        this._likeCounter.textContent = data.likes.length;
    }

    addLikedClass() {
        this._likeButton.classList.add("card__like-button_active");
    }

    removeLikedClass() {
        this._likeButton.classList.remove("card__like-button_active");
    }

    _isLiked() {
        return this._data.likes.some((like) => {
            return like._id === this._userId
        })
    }

    checkLike() {
        if (this._isLiked()) {
            this.addLikedClass();
        } else {
            this.removeLikedClass();
        }
    }

    getLikeButton() {
        return this._likeButton.classList.contains("card__like-button_active")
    }
}