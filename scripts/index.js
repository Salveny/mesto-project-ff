const cardTemplate = document.querySelector("#card-template").content; // находим содержимое темплейта
const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true); //клонируем шаблон

// @todo: Функция создания карточки

const createCard = function (cardData, delCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name; //получаем данные карточек

  const deleteButton = cardElement.querySelector(".card__delete-button"); //находим кнопку удаление

  deleteButton.addEventListener("click", delCard);
  //eventTarget.addEventListener('event', handler)
  return cardElement;
};

function delCard(event) {
  event.target.closest(".places__item").remove();
}

const placesList = document.querySelector(".places__list");
initialCards.forEach((item) => placesList.append(createCard(item, delCard))); 
//перебор массива, для каждого элемента выполняется функция создания карточки; вывод карточек в конец списка
//initialCards.forEach(function(item) {placesList.append(createCard(item, delCard)});
