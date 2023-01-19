// External Dependencies
require("dotenv").config()
const jtw = require("jsonwebtoken");
const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const mongoDB = require ("mongodb");
const client = new mongoDB.MongoClient("mongodb+srv://MrRichGamer:MrRichGamer.12@eco-trade.zbhmzeu.mongodb.net/?retryWrites=true&w=majority");
// Global Config
const UserRouter = express.Router();
// GET
UserRouter.get("/:name&:password", async (req, res) => {
    const name = req.params.name
    const password = req.params.password
    console.log(req.params);
    console.log(name);
    console.log(password);
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')

    try {
        query = {name: name,password:password};
        const user = await collections1.find(query).toArray();
        console.log(user);
        
        if (user) {
            res.status(200).send(user);

        const accessTokenN=jtw.sign(name,process.env.ACCESS_TOKEN_SECRET)
        const accessTokenPW= jtw.sign(password,process.env.ACCESS_TOKEN_SECRET)
        res.json({accessTokenN:accessTokenN,accessTokenPW:accessTokenPW})
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
    const image = req.params.image
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')

    try {
        const updatedUser = req.params;
        const query = { name:name,password:password,image:image};
      
        const result = await collections1.updateOne(query, { $set: updatedUser });

        result
            ? res.status(200).send(`Successfully updated user with name ${name}`)
            : res.status(304).send(`User with name: ${name} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// DELETE
UserRouter.delete("/:name&:password", async (req, res) => {
    const name = req.params.name
    const password = req.params.password
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')

    try {
        const query = {name: name,password:password};
        const user = await collections1.find(query).toArray();
        const result = await collections1.deleteOne(user);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user ${name}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user ${name}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User ${name} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});

module.exports = UserRouter