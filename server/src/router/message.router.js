const express = require("express");
const { ROUTES } = require("../lib/settings");
const MessageController = require("../controllers/message.controller");
const Router = express.Router();
const ValidateToken = require("../middleware/jwt.middleware");

class MessageRouter extends MessageController {
    constructor() {
        super();
        Router.get(ROUTES.GET_MESSAGES, this.findAllMessages);
        Router.get(ROUTES.GET_LAST_MESSAGE, this.findLastMessages);
        Router.get(ROUTES.GET_CONTACT_MESSAGES, ValidateToken, this.findContactMessages);
        Router.post(ROUTES.POST_MESSAGE, ValidateToken, this.addMessage);
    }
}

const MessageRouterClass = new MessageRouter();
MessageRouterClass;
module.exports = Router;