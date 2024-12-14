const express = require("express");
const { ROUTES } = require("../lib/settings");
const UserController = require("../controllers/user.controller");
const ValidateToken = require("../middleware/jwt.middleware");
const Router = express.Router();

class UserRouter extends UserController {
    constructor() {
        super();
        Router.get(ROUTES.GET_USERS_SIDEBAR, ValidateToken, this.findSidebarUsersController);
        Router.get(ROUTES.GET_USER, this.findUserController);
        Router.get(ROUTES.GET_USERS, ValidateToken, this.findUsersController);
    }
}

const UserRouterClass = new UserRouter();
UserRouterClass;
module.exports = Router;