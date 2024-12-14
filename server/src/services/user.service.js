/**
 * Class UserService
 * Contains all logic for handling the user model and collection
 */

const UserSchema = require("../models/schema/user.schema");
const UserCollection = require("../models/user.model");

class UserServiceClass {
    constructor() {

        /**
         * Adds a user
         * @param {*} user The user object to be inserted into the user collection
         * @returns UserCollection Response
         */
        this.addUser = (user) => {

            let userSchema = new UserSchema(user);
            if (!userSchema.validate()) throw new Error("User creation object is incorrect");
            let mappedUser = userSchema.mapToModel();

            return UserCollection.addUser(mappedUser);
        };

        /**
         * Gets a user
         * @param {*} identifier The identifier for the user object to be retrieved from the collection
         * @returns UserCollection Response
         */
        this.findUser = (identifier) => {
            if (!identifier) throw new Error("Find user called without identifier");
            return UserCollection.getUser(identifier);
        };


        /**
         * Gets a user and includes their jwt token in the response
         * @param {*} identifier The identifier for the user object to be retrieved from the collection
         * @returns UserCollection Response
         */
        this.findUserIncToken = (identifier) => {
            if (!identifier) throw new Error("Find user called without identifier");
            return UserCollection.getUserIncToken(identifier);
        };

        /**
         * Gets all users in collection
         * @returns UserCollection Response
         */
        this.getUsers = () => {
            return UserCollection.getUsers();
        };
    }
}

const UserService = new UserServiceClass();
module.exports = UserService;