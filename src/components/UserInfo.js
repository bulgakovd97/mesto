export default class UserInfo {

    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._profileName = document.querySelector(nameSelector);
        this._profileAbout = document.querySelector(aboutSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent,
        }
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileAbout.textContent = data.about;
        this.setUserAvatar(data);
    }

    setUserAvatar(data) {
        this._profileAvatar.src = data.avatar;
    }
}