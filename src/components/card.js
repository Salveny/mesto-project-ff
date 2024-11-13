export { createCard, delCard, likeCard };

function createCard (cardData, cardTemplate, delCard, openCardImage, likeCard) { //создаем карточку
  const cardElement = cardTemplate
      .querySelector('.card') 
      .cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  //получаем данные карточек
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name; 
  cardTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button'); //кнопка удаления
  deleteButton.addEventListener('click', () => {
    delCard(cardElement);
  });

  const cardLikeBtn = cardElement.querySelector('.card__like-button'); //кнопка лайка
  cardLikeBtn.addEventListener('click', likeCard); 

  cardImage.addEventListener('click', () => {
    openCardImage(cardData);
  });
   
  return cardElement;
};

function delCard(cardElement) { //функция удаления карточки
  cardElement.remove();
};

function likeCard(evt) { //лайк карточки
  evt.target.classList.toggle('card__like-button_is-active');
};




