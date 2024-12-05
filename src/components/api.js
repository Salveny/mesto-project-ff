// в файле api.js описаны функции для взаимодействия с сервером;
// Токен: 96fbd8d6-e70e-4679-a331-b57f6174f30c (чтоб сервер различал юзеров)
// Идентификатор группы: wff-cohort-27

//делаем объект, данные из которого передаем в каждый запрос
const apiInfo = { 
    mainUrl: 'https://nomoreparties.co/v1/wff-cohort-27/',
    headers: {
        authorization: '96fbd8d6-e70e-4679-a331-b57f6174f30c',
        'Content-Type': 'application/json'
    }
}

//получаем данные юзера с сервера
export const getUserInfo = () => {
    return fetch(`${apiInfo.mainUrl}users/me`, { //https://nomoreparties.co/v1/wff-cohort-27/users/me
        method: "GET",
        headers: apiInfo.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

//запрос на редактирование профиля
export const editUserInfo = (name, about) => {
    return fetch(`${apiInfo.mainUrl}users/me`, { 
        method: "PATCH",
        headers: apiInfo.headers,
        body: JSON.stringify({
            name: name,
            about: about
          })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

//обновление аватара юзера
export const editUserAvatar = (link) => {
    return fetch(`${apiInfo.mainUrl}users/me/avatar`, { 
        method: "PATCH",
        headers: apiInfo.headers,
        body: JSON.stringify({
            avatar: link
          })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

//получаем данные карточек с сервера
export const getDefaultCards = () => {
    return fetch(`${apiInfo.mainUrl}cards`, { //https://nomoreparties.co/v1/wff-cohort-27/cards
        method: "GET",
        headers: apiInfo.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

//добавление новой карточки
export const addNewCardApi = (name, link) => {
    return fetch(`${apiInfo.mainUrl}cards`, {
        method: "POST",
        headers: apiInfo.headers,
        body: JSON.stringify({
            name: name,
            link: link,
          })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

//удаление карточки
export const delNewCardApi = (id) => {
    return fetch(`${apiInfo.mainUrl}cards/${id}`, {
        method: "DELETE",
        headers: apiInfo.headers
        })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

//постановка и снятие лайка
export const addAndDelLikes = (id, isLiked) => {
    return fetch(`${apiInfo.mainUrl}cards/likes/${id}`, {
        method: isLiked? 'DELETE': 'PUT', //если isLiked = true, то удалить лайк, иначе установить
        headers: apiInfo.headers
        })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

