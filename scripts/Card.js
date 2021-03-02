//Импорт переменных для создания класса карточки
import { cards, viewPopup, viewTitle, viewImage, addPopup, addForm, titleInput, linkInput } from './index.js';

//Создааём экземпляр карточки
class Card {
    _title;
    _image;
    _cardSelector;
    _element;

    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    }

    getCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.card__title').textContent = this._title;
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._title;

        this._setEventListeners();
        
        return this._element;
    }

    _getTemplate() {
        const cardElement = document.querySelector('.card-template').content.querySelector(this._cardSelector).cloneNode(true);
        
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._viewCardImage();
        })

        viewPopup.addEventListener('click', (evt) => {
            this._сloseViewImage(evt);
        })
    }

    _likeCard(evt) {
        evt.target.classList.toggle('card__like-button_active');
    }

    _deleteCard(evt) {
        evt.target.closest('.card').remove();
    }

    _viewCardImage() {
        viewPopup.classList.add('popup_opened');
        
        viewTitle.textContent = this._title;
        viewImage.src = this._image;
        viewImage.alt = this._title;
        
        document.addEventListener('keyup', (evt) => {
            this._handleViewEscUp(evt);
        })
    }

    _handleViewEscUp(evt) {
        if (evt.key === 'Escape') {
            this._closeViewPopup();
        }
    }

    _сloseViewImage(evt) {
        if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
            this._closeViewPopup();
        }
    }

    _closeViewPopup() {
        viewPopup.classList.remove('popup_opened');
    }

    setAddSubmitListener() {
        addForm.addEventListener('submit', (evt) => {
            this._handleAddSubmit(evt);
        });
    }

    _handleAddSubmit(evt) {
        evt.preventDefault();
    
        this._title = titleInput.value;
        this._image = linkInput.value;
        
        this._addCard();
        
        addPopup.classList.remove('popup_opened');    
    }

    _addCard() {
        cards.prepend(this.getCard());
    }
}

//Экспорт класса карточки
export { Card };