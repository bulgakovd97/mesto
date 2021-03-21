export default class UserInfo {

    constructor({ nameSelector, occupationSelector }) {
        this._name = document.querySelector(nameSelector);
        this._occupation = document.querySelector(occupationSelector);

        this._nameInput = document.querySelector(".popup__input_type_name");
        this._occupationInput = document.querySelector(".popup__input_type_occupation");
    }

    getUserInfo() {
        this._nameInput.value = this._name.textContent;
        this._occupationInput.value = this._occupation.textContent;
    }

    setUserInfo() {
        this._name.textContent = this._nameInput.value;
        this._occupation.textContent = this._occupationInput.value;
    }
}