export {openModal, closeModal}

function closePopupEsc(evt) {  //слушатель клавиатуры описываем отдельно, чтоб передать как аргумент далее
    if (evt.key === 'Escape') { //нажатие на клавишу esc
      closeModal(document.querySelector('.popup_is-opened')); //функция закрытия для открытого элемента
    }
}

function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);//если попап открыт, добавляем слушателя клавиатуры на весь документ!
};

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);//если попап закрыт, удаляем слушателя клавиатуры
}



