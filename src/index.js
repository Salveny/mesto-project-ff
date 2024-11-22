import './styles/index.css';
import {openModal, closeModal} from './components/modal.js'
import {initialCards} from './components/cards.js';
import {createCard, delCard, likeCard} from './components/card.js';

//DOM-элементы

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');

const modalCloseButtons = document.querySelectorAll('.popup__close');

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
function submitProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value; //вводимые значения будут переданы в профиль юзера
  profileDescription.textContent = jobInput.value;
  closeModal(popupUser);
};
// Прикрепляем обработчик к форме редактирования профиля
profileForm.addEventListener('submit', submitProfileForm);

//форма добавления новой карточки
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

//вешаем класс анимации и слушатели закрытия оверлея на все модалки
popups.forEach((modal) => {
  modal.classList.add('popup_is-animated') //вешаем класс анимации

  modal.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {    // устанавливаем слушатель оверлея
      closeModal(modal);
    }  
  })
});

// закрытие попапа нажатием на "крестик"
 modalCloseButtons.forEach(button => {
  const popupItem = button.closest('.popup'); //ищем ближайший к "крестику" попап
  button.addEventListener('click', () => {
   closeModal(popupItem);
  })
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

//вызов функции валидации
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

//enableValidation({
//  formSelector: '.popup__form',
// inputSelector: '.popup__input',
//  submitButtonSelector: '.popup__button',
//  inactiveButtonClass: 'popup__button_disabled',
//  inputErrorClass: 'popup__input_type_error',
//  errorClass: 'popup__error_visible'
//});
// очистка ошибок валидации
//clearValidation(profileForm, validationConfig); 