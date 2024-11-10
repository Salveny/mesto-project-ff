import './styles/index.css';
import {openModal, closeModal} from './components/modal.js'
import {initialCards} from './components/cards.js';
import {createCard, delCard, likeCard} from './components/card.js';

export const cardTemplate = document.querySelector('#card-template').content; // находим содержимое темплейта
export const cardLikeBtn = cardTemplate.querySelector('.card__like-button');

const popup = document.querySelector('.popup');
const popupContent = popup.querySelector('.popup__content')
const popupUser = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closePopupButton = popup.querySelector('.popup__close');
const closePopupButtons = document.querySelectorAll('.popup__close');
console.log(closePopupButtons)

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info')
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');


const placesList = document.querySelector('.places__list');
initialCards.forEach((item) => placesList.append(createCard(item, delCard, likeCard))); 
//перебор массива, для каждого элемента выполняется функция создания карточки; вывод карточек в конец списка
//initialCards.forEach(function(item) {placesList.append(createCard(item, delCard)});

profileEditButton.addEventListener('click', () => {
  openModal(popupUser)
});

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard)
});



function addEvtListener(popupItem) {
  //нажатие на "крестик"
  const arr = Array.from(document.querySelectorAll('.popup__close'));
  for (let i = 0; i < arr.length; i ++) {
    arr[i].addEventListener("click", () => {
      closeModal(popupItem);
    });
  }
   
  popupItem.addEventListener("mousedown", (evt) => { //нажатие на оверлей
     // если event.target содержит класс "popup", то закрываем
  if(evt.target.classList.contains('popup')) {
    closeModal(popupItem);
  }
  });

}


addEvtListener(popupUser);
addEvtListener(popupNewCard);
addEvtListener(popupImage);


console.log(closePopupButton);

//closePopupButton.addEventListener('click', closeOnBackDropClick);

// Вешаем обработчик на весь документ, закрытие на оверлей
//popup.addEventListener('click', (evt) => { 
 // if(evt.target === popup) { 
  //    popup.classList.toggle("popup_is-opened"); 
  //}
//});

//function closeOnBackDropClick({currentTarget, target}) {
 // const popup = currentTarget
 // if(target === popup) {
  //    close()
  //}
//}
