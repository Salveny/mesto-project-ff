export {createCard, delCard, likeCard};
import { cardTemplate, cardLikeBtn } from "../index.js";

const createCard = function (cardData, delCard, likeCard) { //создаем карточку
    const cardElement = cardTemplate
      .querySelector('.places__item') 
      .cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name; //получаем данные карточек
  
    const deleteButton = cardElement.querySelector('.card__delete-button'); //кнопка удаления
  
    deleteButton.addEventListener('click', delCard);
    //eventTarget.addEventListener('event', handler)

    const cardLikeBtn = cardElement.querySelector('.card__like-button'); //кнопка лайка
    
    cardLikeBtn.addEventListener('click', likeCard); 
    return cardElement;
};

function delCard(event) { //функция удаления
    event.target.closest('.places__item').remove();
};

function likeCard(event) { //лайк карточки
  event.target.classList.toggle('card__like-button_is-active');
}

