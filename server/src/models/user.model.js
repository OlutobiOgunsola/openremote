/**
 * Class UserModel
 * Contains all the logic pertaining to the user collection and manipulation
 */

const { SignJWT } = require("../lib/utils");

class UsersModel {
    constructor() {
        this._users = [];

        /**
         * Adds a user
         * @param {*} user - The user object to be inserted into user collection
         * @returns User Object
         */
        this.addUser = (user) => {
            // check if email is unique;
            let emailPresent = this._users.filter(userItem => (userItem.email === user.email));
            // check if phone number is unique;
            let numberPresent = this._users.filter(userItem => (userItem.phoneNo === user.phoneNo));

            if (emailPresent.length > 0 || numberPresent.length > 0) { throw new Error("Email or phone number is not unique"); };

            let usersTemp = [...this._users];

            let jwtSign = SignJWT(user, '1000s');
            user.jwt = jwtSign;
            usersTemp.push(user);
            this._users = usersTemp;
            return user;
        };

        /**
         * Gets all users
         * @returns User Collection
         */
        this.getUsers = () => {
            return this._users.map(user => ({ ...user, jwt: null }));
        };

        /**
         * Gets a user
         * @param {*} identifier The identifier for the user object to be returned
         * @returns User Object or throws an error
         */
        this.getUser = (identifier) => {
            let user = this._users.filter(user => {
                return (user.email === identifier) || (user.phoneNo === identifier);
            });
            if (!user) { throw new Error("User Not Found"); };
            return { ...user[0], jwt: null };
        };

        /**
         * Gets a user but includes their jwt token in the response
         * @param {*} identifier The identifier for the user object to be returned
         * @returns User Object or throws an error
         */
        this.getUserIncToken = (identifier) => {
            let user = this._users.filter(user => {
                return (user.email === identifier) || (user.phoneNo === identifier);
            });
            if (!user) { throw new Error("User Not Found"); };
            return user[0];
        };

        /**
         * Signs a JWT for a user
         * @param {*} email Email of the user to generate a JWT for
         * @returns User Object with Signed JWT
         */
        this.signJWT = (email) => {
            let userIndex = this._users.findIndex(user => (user.email.toLowerCase() === email.toLowerCase()));
            if (userIndex < 0) throw new Error("User not found");
            if (userIndex > -1) {
                // user exists, create JWT and sign
                let user = this._users[userIndex];
                let jwtSign = SignJWT(user, '1000s');
                user.jwt = jwtSign;

                //save the user object in memory
                this._users[userIndex] = user;
                return {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    phoneNo: user.phoneNo,
                    jwt: user.jwt,
                };
            };
        };
    }
}

const UserCollection = new UsersModel();
module.exports = UserCollection;