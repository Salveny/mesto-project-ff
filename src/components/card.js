export {createCard, delCard, likeCard, openCardImage};
import {cardTemplate} from '../index.js';
import {openModal} from '../components/modal.js'

const createCard = function (cardData, delCard, likeCard, openCardImage) { //создаем карточку
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

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', openCardImage);
   
    return cardElement;
};

function delCard(evt) { //функция удаления
    evt.target.closest('.places__item').remove();
};

function likeCard(evt) { //лайк карточки
  evt.target.classList.toggle('card__like-button_is-active');
};

function openCardImage(evt) { //функция открытия картинки
  const modalImage = document.querySelector('.popup__image');
  const modalCaption = document.querySelector('.popup__caption');
  modalImage.src = evt.target.src;
  modalImage.alt = evt.target.alt;
  modalCaption.textContent = evt.target.alt;
  if (evt.target.classList.contains('card__image')) {
    const popupImage = document.querySelector('.popup_type_image');
    openModal(popupImage);
  }
};



