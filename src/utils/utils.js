import Card from '../components/Card.js';
import { popupWithImage } from '../pages/index.js';

export default function createCard(data) {
    const card = new Card(data, ".card-template", {
        handleCardClick: (title, image) => {
            popupWithImage.open(title, image);
        }
    });

    return card.getCard();
}