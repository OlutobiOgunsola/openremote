const crypto = require("crypto");

/**
 * Class User Schema
 */

class UserSchema {
    constructor(userObject) {
        this._id = crypto.randomUUID(); // simulate a unique ID for each user
        this._userName = userObject.userName;
        this._email = userObject.email.toLowerCase();
        this._phoneNo = userObject.phoneNo;
        this._jwt = null;
        this.validate = () => {
            return this._userName && this._email && this._phoneNo;
        };

        this.mapToModel = () => ({
            id: this._id,
            userName: this._userName,
            email: this._email,
            phoneNo: this._phoneNo,
            jwt: this._jwt
        });
    }
}

module.exports = UserSchema;