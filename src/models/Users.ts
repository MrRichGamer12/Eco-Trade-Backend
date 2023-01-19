// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Users {
    constructor(public name: string, public password: string, public id?: ObjectId) {}
}