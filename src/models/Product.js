// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Product {
    constructor(name,userid, image, description) {
        this.name = name; 
        this.userid=userid;
        this.image = image; 
        this.description = description; 
        this._id = ObjectId()
    }
}