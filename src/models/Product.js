// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Product {
    constructor(name, image, description) {
        this.name = name; 
        this.image = image; 
        this.description = description; 
        this._id = ObjectId()
    }
}