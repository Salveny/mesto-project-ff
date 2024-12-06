//в файле validation.js описаны функции для валидации форм. Из файла экспортируется только функция активации валидации enableValidation и функция очистки ошибок валидации clearValidation;

function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const {inputErrorClass, errorClass} = validationConfig;

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass); // Показываем сообщение об ошибке
}

function hideInputError(formElement, inputElement, validationConfig) {
    const {inputErrorClass, errorClass} = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = ''; //Очистка свойства textContent элемента formError
    errorElement.classList.remove(errorClass); // Скрываем сообщение об ошибке
    inputElement.setCustomValidity('');
}

function isValid (formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // или элемент и заменяет ею стандартное сообщение об ошибке
        // данные атрибута доступны у элемента инпута через ключевое слово dataset
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputElement.setCustomValidity('');
  }

     if (!inputElement.validity.valid) {
         showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
     } else {
         hideInputError(formElement, inputElement, validationConfig);
     } 
};

function hasInvalidInput (inputList) {
    return inputList.some ((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//переключение кнопки, если форма не прошла валидацию
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    const {inactiveButtonClass} = validationConfig;

    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

//добавление слушателей событий форме и ее полям
const setEventListeners = (formElement, validationConfig) => {
    const {inputSelector, submitButtonSelector} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener ('input', () => {
            isValid(formElement, inputElement, validationConfig)
            toggleButtonState(inputList, buttonElement, validationConfig);
        })
    })
};

//активация валидации
export const enableValidation = (validationConfig) => {
    const {formSelector} = validationConfig;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        })
       setEventListeners(formElement, validationConfig);
    })
}

//очистка ошибок валидации и дезактивация кнопки
export function clearValidation (formElement, validationConfig) {
    const {inputSelector, submitButtonSelector, inactiveButtonClass} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach(input => {
        hideInputError(formElement, input, validationConfig)
    })
    buttonElement.classList.add(inactiveButtonClass)
}
