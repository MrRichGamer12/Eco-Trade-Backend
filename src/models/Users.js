// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Users {
    constructor(name,password,image) {
        this.name = name; 
        this.password = password,
        this.image= image,
        this._id = ObjectId(); 
    }
}