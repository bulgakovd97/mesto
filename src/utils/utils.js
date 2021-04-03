import Card from '../components/Card.js';
import { popupWithImage, popupConfirm, api, userId } from '../pages/index.js';

export function createCard(item) {
    const card = new Card({
        data: item,

        userId,
        
        handleCardClick: (card) => {
            popupWithImage.open(card);
        },
        
        handleLikeClick: (card) => {
            if (card.getLikeButton()) {
                card.removeLikedClass();

                api.deleteLike(card._data._id)
                .then((data) => {
                    card.setLikeCount(data);
                })
                .catch(err => console.log('Невозможно убрать лайк - ' + err))
            } else {
                card.addLikedClass();

                api.putLike(card._data._id)
                .then((data) => {
                    card.setLikeCount(data);
                })
                .catch(err => console.log('Невозможно поставить лайк - ' + err))
            }
        },

        handleDeleteClick: (card) => {
            popupConfirm.open();
            
            popupConfirm.setSubmitAction(() => {
                popupConfirm.preremove(true);
                
                api.removeCard(item._id)
                    .then(() => {
                        card.remove();

                        popupConfirm.close();
                    })
                    .catch(err => console.log('Ошибка удаления карточки - ' + err))
            })
            
            popupConfirm.preremove(false);
        }
    },

    api,
    
    ".card-template");
    
    return card.getCard();
}