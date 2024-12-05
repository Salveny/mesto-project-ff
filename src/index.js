import './styles/index.css';
import {openModal, closeModal} from './components/modal.js'
import {initialCards} from './components/cards.js';
import {createCard, delCard, likeCard} from './components/card.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, getDefaultCards, editUserInfo, addNewCardApi, editUserAvatar} from './components/api.js'

//DOM-элементы

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');
const modalCloseButtons = document.querySelectorAll('.popup__close');

const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarFormLinkInput = avatarForm.querySelector('.popup__input_type_avatar-url')


const popupUser = document.querySelector('.popup_type_edit');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');


const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');

const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const modalImage = document.querySelector('.popup__image');
const modalCaption = document.querySelector('.popup__caption');

let myId = '';//мой ID

const validationConfig = { // все нужные функциям классы и селекторы элементов как объект настроек для функции enableValidation
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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
  evt.preventDefault();

  const button = profileForm.querySelector('.popup__button')
  button.textContent = 'Сохранение...'
 
  editUserInfo(nameInput.value, jobInput.value)
  .then (() => {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    button.textContent = 'Сохранить'
  })
  closeModal(popupUser);
};

// Прикрепляем обработчик к форме редактирования профиля
profileForm.addEventListener('submit', submitProfileForm);

//форма добавления новой карточки
function addNewCard(evt) {
  evt.preventDefault();

  const button = newCardForm.querySelector('.popup__button')
  button.textContent = 'Сохранение...'

  addNewCardApi(placeNameInput.value, linkInput.value)
    .then(newCardData => {
      const newCard = createCard(
        newCardData,//вставка новых значений в поля
        cardTemplate,
        myId,
        delCard,
        openCardImage,
        likeCard
      );

      cardsContainer.prepend(newCard); //вставка новой карточки в начало списка
      newCardForm.reset(); //очистка формы перед закрытием
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      button.textContent = 'Сохранить'
    }) 
};

//Прикрепляем обработчик к форме добавления карточки
newCardForm.addEventListener('submit', addNewCard);

//нужно получить сразу массив карточек и id юзера для их отображения
const promisses = [getUserInfo(), getDefaultCards()];
Promise.all(promisses) 
.then(([userData, cards]) => {
  profileTitle.textContent = userData.name; 
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage =  `url(${userData.avatar})`;
  myId = userData['_id'];

  cards.forEach(function(card) { 
    const createdCard = createCard(
      card, 
      cardTemplate,
      myId,
      delCard, 
      openCardImage,
      likeCard
    );
    cardsContainer.append(createdCard); 
  }); 
})
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
}); 

// getUserInfo()// промис для получения данных юзера
// .then(data => {
//   profileTitle.textContent = data.name; //подставляем в поле profileTitle полученное с сервера значение name 
//   profileDescription.textContent = data.about; //подставляем в поле profileDescription полученное с сервера значение about 
// profileImage.style.backgroundImage = `url(${data.avatar})`;
//   myId = data['_id'];
// })

// промис для получения всех карточек с сервера
// getDefaultCards()
// .then(data => {
//   data.forEach(function(item) { //перебор массива, для каждого элемента выполняется функция создания карточки; вывод карточек в конец списка
//     const createdCard = createCard(
//       {name: item.name, link: item.link}, 
//       cardTemplate,
//       delCard, 
//       openCardImage,
//       likeCard);
//     cardsContainer.append(createdCard); 
//   }); 
// })

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

//открытие модалки смены аватара
const NewAvatarButton = document.querySelector('.profile__image');
NewAvatarButton.addEventListener('click', () => { 
  clearValidation(avatarForm, validationConfig);
  openModal(popupNewAvatar);
});

//функция редактирования профиля
function submitAvatarForm(evt) {
  evt.preventDefault();

  const button = avatarForm.querySelector('.popup__button')
  button.textContent = 'Сохранение...'

  editUserAvatar(avatarFormLinkInput.value)
  .then (userData => {
    profileImage.style.backgroundImage =  `url(${userData.avatar})`;

  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    button.textContent = 'Сохранить'
  })
  closeModal(popupNewAvatar);
  avatarForm.reset()
};

avatarForm.addEventListener('submit', submitAvatarForm);

//открытие модалки профиля
profileEditButton.addEventListener('click', () => { 
  clearValidation(profileForm, validationConfig)
  nameInput.value = profileTitle.textContent; //при открытии в полях присвоены значения..
  jobInput.value = profileDescription.textContent; // ..профиля юзера
  openModal(popupUser)
});

//открытие модалки новой карточки
profileAddButton.addEventListener('click', () => { 
  clearValidation(newCardForm, validationConfig)
  openModal(popupNewCard) 
});

//ВАЛИДАЦИЯ ФОРМ
enableValidation(validationConfig)





