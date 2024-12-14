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
            console.log("recipient socket id", recipientSocketId);
            if (recipientSocketId) {
                console.log("emitting recipient socket id", recipientSocketId);
                io.to(recipientSocketId).emit("newMessageEvent", message);
            }
            console.log("messages", this._messages);
            return message;
        };

        /**
         * Gets all Messages
         * @returns Messages Collection
         */
        this.getMessages = () => {
            return this._messages;
        };
    }
}

const MessageCollection = new MessagesModel();
module.exports = MessageCollection;