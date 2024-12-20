const { GetOnlineUserSocketId, io } = require("../lib/socket");

class MessagesModel {
    constructor() {
        this._messages = [];

        /**
         * Adds a message
         * @param {*} message The message object to be inserted into the messages collection
         * @returns Message Object
         */
        this.addMessage = (message) => {
            let messagesTemp = [...this._messages];
            messagesTemp.push(message);
            this._messages = messagesTemp;

            // notify the recipient if online
            const recipientSocketId = GetOnlineUserSocketId(message.receiver);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("newMessageEvent", message);
            }
            return message;
        };

        /**
         * Gets all Messages
         * @returns Messages Collection
         */
        this.getMessages = () => {
            return this._messages;
        };

        /**
         * Edits a message
         * @returns Message Object
         */
        this.readMessage = (id) => {
            let messageIndex = this._messages.findIndex(message => (message.id === id));
            if (messageIndex < 0) throw new Error("Message not found");
            let message = this._messages[messageIndex];
            message.opened = true;
            this._messages[messageIndex] = message;
            return message;
        };
    }
}

const MessageCollection = new MessagesModel();
module.exports = MessageCollection;