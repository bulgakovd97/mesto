import { nameInput, aboutInput, avatarInput, titleInput, linkInput } from "../utils/constants";

export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _checkApiRequest(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(new Error(`${res.status}`))
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, { headers: this.headers })
            .then(this._checkApiRequest)
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers,
        })
            .then(this._checkApiRequest)
    }

    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    setUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: nameInput.value,
                about: aboutInput.value,
            })
        })
            .then(this._checkApiRequest)
    }

    changeAvatar() {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarInput.value,
            })
        })
            .then(this._checkApiRequest)
    }

    addCard() {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: titleInput.value,
                link: linkInput.value,
            })
        })
            .then(this._checkApiRequest)
    }

    removeCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._checkApiRequest)
    }

    putLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then(this._checkApiRequest)
    }

    deleteLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(this._checkApiRequest)
    }
}