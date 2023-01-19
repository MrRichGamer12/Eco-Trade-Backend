// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Users {
    constructor(name, password) {
        this.name = name; 
        this.password = password
        this._id = ObjectId(); 
    }
}