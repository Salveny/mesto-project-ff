export {openModal, closeModal, closePopupEsc}

function closePopupEsc(evt) {  //слушатель клавиатуры описываем отдельно, чтоб передать как аргумент далее
    if (evt.key === 'Escape') { //нажатие на клавишу esc
      const openPopup = document.querySelector('.popup_is-opened'); // находим открытый попап
      closeModal(openPopup); //функция закрытия
    };
}

function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('keydown', closePopupEsc);//если попап открыт, добавляем слушателя клавиатуры
};

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('keydown', closePopupEsc);//если попап закрыт, удаляем слушателя клавиатуры
}



