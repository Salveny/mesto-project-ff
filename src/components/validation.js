//в файле validation.js описаны функции для валидации форм. Из файла экспортируется только функция активации валидации enableValidation и функция очистки ошибок валидации clearValidation;

function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible'); // Показываем сообщение об ошибке
}

function hideInputError(formElement, inputElement) {
     const errorElement = document.querySelector(`.${inputElement.id}-error`);
     inputElement.classList.remove('popup__input_type_error');
     errorElement.classList.remove('popup__error_visible'); // Скрываем сообщение об ошибке
     errorElement.textContent = ''; //Очистка свойства textContent элемента formError
}

function isValid (formElement, inputElement) {
     if (!inputElement.validity.valid) {
         showInputError(formElement, inputElement, inputElement.validationMessage);
     } else {
         hideInputError(formElement, inputElement);
     } 
 };

//добавление слушателей событий форме и ее полям
const setEventListeners = (formElement) => {
    const inputList = Array.from(document.querySelectorAll('.popup__input'));
    //const buttonElement = formElement.querySelector('.popup__button');
    //toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
        inputElement.addEventListener ('input', () => {
            isValid(formElement, inputElement)
        })
    })
};

//активация валидации
export const enableValidation = () => {
   const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        })
       setEventListeners(formElement);
    })
}



// function hideInputError(formElement, inputElement) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
//     inputElement.classList.remove('popup__input_type_error');
//     errorElement.classList.remove('popup__error_visible'); // Скрываем сообщение об ошибке
//     errorElement.textContent = ''; //Очистка свойства textContent элемента formError.
// }

// let checkInputValidity = (formElement, inputElement) => {
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//         hideInputError(formElement, inputElement);
//     } 
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some ((inputElement) => {
//     return !inputElement.validity.valid
//     })
// }

//переключение кнопки, если форма не прошла валидацию
// const toggleButtonState = (inputList, buttonElement) => {
//     if(hasInvalidInput(inputList)) {
//         buttonElement.setAttribute('disabled', true);
//         buttonElement.classList.add('popup__button_disabled');
//     } else {
//         buttonElement.removeAttribute('disabled');
//         buttonElement.classList.remove('popup__button_disabled');
//         console.log (buttonElement)
//     }
//   }



//активация валидации
// const enableValidation = () => {
//     const formList = Array.from(document.querySelectorAll('.popup__form'));
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//       })
//       setEventListeners(formElement);
//     })
//   }

// export {enableValidation}