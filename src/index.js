import './styles/index.css';
import {openModal, closeModal} from './components/modal.js'
import {initialCards} from './components/cards.js';
import {createCard, delCard, likeCard} from './components/card.js';

//DOM-элементы

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const popupUser = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');

const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

//Callbacks
function openCardImage(cardData) { //функция открытия картинки
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;
  openModal(popupImage);
 // }
};

//функция редактирования профиля
function profileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value; //вводимые значения будут переданы в профиль юзера
  profileDescription.textContent = jobInput.value;
  closeModal(popupUser);
};
// Прикрепляем обработчик к форме редактирования профиля
profileForm.addEventListener('submit', profileFormSubmit);

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {name: placeNameInput.value, link: linkInput.value}; //вставка новых значений в поля
  const createdCard = createCard(newCard, cardTemplate, delCard, openCardImage, likeCard);
  cardsContainer.prepend(createdCard); //вставка новой карточки в начало списка
  newCardForm.reset(); //очистка формы перед закрытием
  closeModal(popupNewCard);
};
//Прикрепляем обработчик к форме добавления карточки
newCardForm.addEventListener('submit', addNewCard);

//перебор массива, для каждого элемента выполняется функция создания карточки; вывод карточек в конец списка
initialCards.forEach(function(item) {
  const createdCard = createCard(
    {name: item.name, link: item.link}, 
    cardTemplate,
    delCard, 
    openCardImage,
    likeCard);
  cardsContainer.append(createdCard); 
}); 

//вешаем класс анимации на все модалки
popups.forEach(modal => {
  modal.classList.add('popup_is-animated') 
});

//открытие модалки профиля
profileEditButton.addEventListener('click', () => { 
  nameInput.value = profileTitle.textContent; //при открытии в полях присвоены значения..
  jobInput.value = profileDescription.textContent; // ..профиля юзера
  openModal(popupUser)
});

//открытие модалки новой карточки
profileAddButton.addEventListener('click', () => { 
  openModal(popupNewCard) 
});

function addEvtListener(popupItem) { //слушатели на закрытие попапа
  const arr = Array.from(document.querySelectorAll('.popup__close')); //нажатие на "крестик"
  for (let i = 0; i < arr.length; i ++) {
    arr[i].addEventListener("click", () => {
      //form.reset();
      closeModal(popupItem);
    });
  };   
  popupItem.addEventListener("mousedown", (evt) => { //нажатие на оверлей
     // если event.target содержит класс "popup", то закрываем
  if(evt.target.classList.contains('popup')) {
    closeModal(popupItem);
  }
  });
};

addEvtListener(popupUser);
addEvtListener(popupNewCard);
addEvtListener(popupImage);