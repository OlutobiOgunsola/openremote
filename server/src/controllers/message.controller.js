/**
 * Class Message Controller
 */

const { RESPONSE_CODES, RESPONSE } = require("../lib/settings");
const MessageService = require("../services/message.service");

class MessageController {
    constructor() {
        this.addMessage = (req, res) => {
            let message = req.body;
            message.sender = req.user.id;
            if (!message) {
                return res.status(RESPONSE_CODES.BAD_REQUEST).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.BAD_REQUEST,
                    data: "Message object must be passed to create a message"
                });
            }


            try {
                let messageObject = MessageService.addMessage(message);
                return res.status(RESPONSE_CODES.SUCCESS).json({
                    ...RESPONSE.SUCCESS,
                    data: messageObject
                });
            } catch (e) {
                console.log(e);
                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e
                });
            }
        };
        this.findContactMessages = (req, res) => {
            const { contact_id } = req.params;
            const { id: user_id } = req.user;

            if (!contact_id || !user_id) {
                return res.status(RESPONSE_CODES.BAD_REQUEST).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.BAD_REQUEST,
                    data: "Get contact messages must contain contact_id param and user_id"
                });
            }

            try {
                let contactMessages = MessageService.getContactMessages(contact_id, user_id);
                return res.status(RESPONSE_CODES.SUCCESS).json({
                    ...RESPONSE.SUCCESS,
                    data: contactMessages
                });
            } catch (e) {
                console.log(e);
                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e
                });
            }
        };
        this.findLastMessages = (req, res) => { };
        this.findAllMessages = (req, res) => { };
        this.readMessage = (req, res) => {
            const { message_id } = req.params;

            try {
                let readMessage = MessageService.readMessage(message_id);
                console.log("reading message", readMessage);
                return res.status(RESPONSE_CODES.SUCCESS).json({
                    ...RESPONSE.SUCCESS,
                    data: readMessage
                });
            } catch (e) {
                console.log(e);
                return res.status(RESPONSE_CODES.SERVER_ERROR).json({
                    ...RESPONSE.FAILURE,
                    code: RESPONSE_CODES.SERVER_ERROR,
                    data: e.message
                });
            }
        };
    }
}

module.exports = MessageController;