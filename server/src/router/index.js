const express = require("express");
const AuthRouterClass = require("./auth.router");
const UserRouterClass = require("./user.router");
const MessageRouterClass = require("./message.router");
const { ROUTE_INDEX } = require("../lib/settings");
const Router = express.Router();

exports.AppRouter = class AppRouter {
    constructor() {
        Router.use(ROUTE_INDEX.AUTH, AuthRouterClass);
        Router.use(ROUTE_INDEX.USER, UserRouterClass);
        Router.use(ROUTE_INDEX.MESSAGE, MessageRouterClass);
        return Router;
    }
};