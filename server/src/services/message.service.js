const MessageCollection = require("../models/messages.model");
const MessageSchema = require("../models/schema/message.schema");

class MessageServiceClass {
    constructor() {
        /**
         * Adds a message
         * @param {*} message The message object to be inserted into the collection
         * @returns MessageCollection Response
         */
        this.addMessage = (message) => {
            let messageSchema = new MessageSchema(message);
            if (!messageSchema.validate()) throw new Error("Message creation object is incorrect");
            let mappedMessage = messageSchema.mapToModel();
            return MessageCollection.addMessage(mappedMessage);
        };

        /**
         * Gets all messages
         * @returns MessageCollection Response
         */
        this.findAllMessages = () => {
            return MessageCollection.getMessages();
        };

        this.getContactMessages = (contact_id, user_id) => {
            let allMessages = MessageCollection.getMessages();
            const allOwnMessages = allMessages.filter(message => (((message.sender === user_id) && (message.receiver === contact_id)) || ((message.sender === contact_id) && (message.receiver === user_id))));
            return allOwnMessages;
        };

        this.readMessage = (message_id) => {
            return MessageCollection.readMessage(message_id);
        };
    }
}

const MessageService = new MessageServiceClass();

module.exports = MessageService;