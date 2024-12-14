const express = require("express");
const { ROUTES } = require("../lib/settings");
const AuthController = require("../controllers/auth.controller");
const Router = express.Router();

class AuthRouter extends AuthController {
    constructor() {
        super();
        Router.post(ROUTES.SIGNUP, this.signupController);
        Router.post(ROUTES.SIGNIN, this.signinController);
    }
}

const AuthRouterClass = new AuthRouter();
AuthRouterClass;
module.exports = Router;