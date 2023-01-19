// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Product {
    constructor(public name: string, public image: ImageData, public description:string, public id?: ObjectId) {}
}