// в файле api.js описаны функции для взаимодействия с сервером;
// Токен: 96fbd8d6-e70e-4679-a331-b57f6174f30c (чтоб сервер различал юзеров)
// Идентификатор группы: wff-cohort-27

//делаем объект, данные из которого передаем в каждый запрос
const apiInfo = { 
    mainUrl: 'https://nomoreparties.co/v1/wff-cohort-27/',
    headers: {
        authorization: '96fbd8d6-e70e-4679-a331-b57f6174f30c'
    }
}

//получаем данные юзера с сервера
export const getUserInfo = () => {
    return fetch(`${apiInfo.mainUrl}users/me`, { //https://nomoreparties.co/v1/wff-cohort-27/users/me
        method: "GET",
        headers: apiInfo.headers
    }).then(res => res.json())
}

//запрос на редактирование профиля
export const editingUserInfo = (name, about) => {
    return fetch(`${apiInfo.mainUrl}users/me`, { 
        method: "PATCH",
        headers: {
            authorization: '96fbd8d6-e70e-4679-a331-b57f6174f30c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
          })
    }).then(res => res.json())
}

//получаем данные карточек с сервера
export const getDefaultCards = () => {
    return fetch(`${apiInfo.mainUrl}cards`, { //https://nomoreparties.co/v1/wff-cohort-27/cards
        method: "GET",
        headers: apiInfo.headers
    }).then(res => res.json())
}

//добавление новой карточки
export const addNewCardApi = (name, link) => {
    return fetch(`${apiInfo.mainUrl}cards`, {
        method: "POST",
        headers: {
            authorization: '96fbd8d6-e70e-4679-a331-b57f6174f30c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link,
          })
    }).then(res => res.json())
}