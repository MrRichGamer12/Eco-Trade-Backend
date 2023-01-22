// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Chat {
    constructor(senderId,reciecerId, mensage) {
        this.senderid = senderId; 
        this.reciecerid=reciecerId;
        this.mensage = mensage; 
        this._id = ObjectId()
    }
}