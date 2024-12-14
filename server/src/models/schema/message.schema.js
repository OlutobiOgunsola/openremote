const crypto = require("crypto");

/**
 * Class Message Schema
 */

class MessageSchema {
    constructor(messageObject) {
        this._id = crypto.randomUUID(); // simulate a unique ID for each message
        this._sender = messageObject.sender;
        this._receiver = messageObject.receiver;
        this._content = messageObject.content;
        this._opened = false;
        this._timeStamp = Date.now();

        this.validate = () => {
            return this._sender && this._receiver && this._content && this._timeStamp;
        };

        this.mapToModel = () => ({
            id: this._id,
            sender: this._sender,
            receiver: this._receiver,
            content: this._content,
            opened: false,
            timeStamp: this._timeStamp
        });
    }
}

module.exports = MessageSchema;