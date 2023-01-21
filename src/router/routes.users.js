// External Dependencies
const env= require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const mongoDB = require ("mongodb");
const client = new mongoDB.MongoClient("mongodb+srv://MrRichGamer:MrRichGamer.12@eco-trade.zbhmzeu.mongodb.net/?retryWrites=true&w=majority");
// Global Config
const UserRouter = express.Router();
// GET
UserRouter.get("/:name&:password", async (req, res) => {
    const name=req.params.name
    const password=req.params.password
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')
     try {
        query = {name: name,password:password};
        const user = await collections1.find(query).toArray();
        console.log(user);
        console.log(process.env.ACCESS_TOKEN_SECRET);
        console.log(user[0]._id);
        if (user) {
            const accessToken = jwt.sign({ userId: user[0]._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
            console.log(accessToken);
            const responseData = {
                user: user,
                token: accessToken
            }
            console.log(responseData);
            return res.status(200).json(responseData);
            
    }
        else{
            res.status(401).send("Fail to find user");
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with name: ${req.params.name}`);
    }
});
UserRouter.get("/", async (req, res) => {
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')

    try {
        const user = await collections1.find({}).toArray();
        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find users`);
    }
});
// POST
UserRouter.post("/:name&:password", async (req, res) => {
    const name = req.params.name
    const password = req.params.password
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')
    try {
        query = {name: name,password:password};
        const user = await collections1.find(query).toArray();
        if(user.length<1){
        const newUser = req.params;
        const result = await collections1.insertOne(newUser);
        result
            res.status(201).send(`Successfully created a new user with id ${result.insertedId}`);
    } 
    else{
         res.status(500).send("That user already exists.");
    }
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// PUT
UserRouter.put("/:name&:password", async (req, res) => {
    const name = req.params.name
    const password = req.params.password
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')


    try {
        const updatedUser = req.params;
        const query = {name:name,password:password};
      
        const result = await collections1.updateOne(query, { $set: updatedUser });

        result
            ? res.status(200).send(`Successfully updated user with name: ${name}`)
            : res.status(304).send(`User with name: ${name} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// DELETE
UserRouter.delete("/:name&:password", async (req, res) => {
    const id = req?.params?.id;
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections1.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`user with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});

module.exports = UserRouter