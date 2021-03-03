//Импорт переменных для создания класса карточки
import { cards, handleCardClick } from './index.js';

//Создааём экземпляр карточки
class Card {
    _title;
    _image;
    _cardSelector;
    _element;
    _cardTitle;
    _cardImage;
    
    constructor(title, image, cardSelector) {
        this._title = title;
        this._image = image;
        this._cardSelector = cardSelector;
    }

    getCard() {
        this._element = this._getTemplate();

        this._cardTitle = this._element.querySelector('.card__title');
        this._cardImage = this._element.querySelector('.card__image');

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
        this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });

        this._cardImage.addEventListener('click', () => {
            handleCardClick(this._title, this._image);
        })
    }

    _likeCard(evt) {
        evt.target.classList.toggle('card__like-button_active');
    }

    _deleteCard(evt) {
        evt.target.closest('.card').remove();
    }
}

//Экспорт класса карточки
export { Card };