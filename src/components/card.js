import {delNewCardApi, addAndDelLikes} from './api.js'


function createCard (cardData, cardTemplate, userId, delCard, openCardImage, likeCard) { //создаем карточку
  const cardElement = cardTemplate
      .querySelector('.card') 
      .cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikes = cardElement.querySelector('.card__likes')

  //получаем данные карточек
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name; 
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;
  
  const deleteButton = cardElement.querySelector('.card__delete-button'); //кнопка удаления 
  
  if(userId !== cardData.owner._id) { //кнопка удаления работает только для хозяина карточки
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => {
      delCard(cardElement, cardData._id);
    });
  }

  const cardLikeBtn = cardElement.querySelector('.card__like-button'); //кнопка лайка
  const isCardLiked = cardData.likes.find(elem => elem['_id'] === userId); //карточка лайкнутая мной

  if (isCardLiked) { //если лайкнула я, то добавляем класс сердечку
    cardLikeBtn.classList.add('card__like-button_is-active')
  }

  cardLikeBtn.addEventListener('click', () => { //слушатель кнопки лайка
    likeCard(cardLikeBtn, cardData._id, cardLikes)
  }); 

  cardImage.addEventListener('click', () => { //слушатель клика на картинку
    openCardImage(cardData);
  });
   
  return cardElement;
};

function delCard(cardElement, id) { //функция удаления карточки
  delNewCardApi(id)
  .then (data => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
};



function likeCard(button, id, likeItem) { //функция лайка карточки
  const isLiked = button.classList.contains('card__like-button_is-active');
  
  addAndDelLikes(id, isLiked)
  .then (cardData => {
    button.classList.toggle('card__like-button_is-active')
    likeItem.textContent = cardData.likes.length
 })
};

export { createCard, delCard, likeCard };



