const jwt = require("jsonwebtoken");
const express = require('express')
const ObjectId = require( "mongodb").ObjectId;
const mongoDB = require ("mongodb");
const client = new mongoDB.MongoClient("mongodb+srv://MrRichGamer:MrRichGamer.12@eco-trade.zbhmzeu.mongodb.net/?retryWrites=true&w=majority");

// Global Config
const ChatRouter = express.Router();
ChatRouter.get("/", async (req, res) => {
    await client.connect();
    let collections3 = client.db('Eco-Trade').collection('Chat')

    try {
        const token = req.headers.authorization;
        const secretKey = "b1cebf58ce03b245a33a8a670c6aeff5c46d75349b4593b2e4bf19ec4ac6c4e3aec00d3aea86f12804a654c66f5dc3a07ca14b237430597ffb272347bfdae2f7";
        jwt.verify(token, secretKey, {algorithms: ['HS256']});
        const chat = await collections3.find({}).toArray();
        if (product) {
            res.status(200).send(chat);
        }
    } catch (error) {
        res.status(404).send("Unable to find any documents in the collection");
    }
});
ChatRouter.get("/", async (req, res) => {
    await client.connect();
    let collections3 = client.db('Eco-Trade').collection('Chat')

    try {
        const token = req.headers.authorization;
        const secretKey = "b1cebf58ce03b245a33a8a670c6aeff5c46d75349b4593b2e4bf19ec4ac6c4e3aec00d3aea86f12804a654c66f5dc3a07ca14b237430597ffb272347bfdae2f7";
        jwt.verify(token, secretKey, {algorithms: ['HS256']});
        const product = await collections3.find().toArray();
        if (product) {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(404).send("Unable to find any documents in the collection");
    }
});

// POST
ChatRouter.post("/:senderid/:reciecerid", async (req, res) => {
    const senderid = req.params.senderid
    const reciecerid = req.params.reciecerid
    const mensage= req.params.mensage
    console.log(senderid);
    console.log(reciecerid);
    console.log(mensage);
    await client.connect();
    let collections3 = client.db('Eco-Trade').collection('Chat')
    try {
        const newChat = req.params;
        
        const result = await collections3.insertOne(newChat);

        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
ChatRouter.put("/:id", async (req, res) => {
    const senderid = req.params.senderid
    const reciecerid = req.params.reciecerid
    const mensage= req.params.mensage
    await client.connect();
    let collections3 = client.db('Eco-Trade').collection('Chat')


    try {
        const updatedChat = {senderid,reciecerid,mensage};
        const query = {senderid:senderid,reciecerid:reciecerid};
      
        const result = await collections3.updateOne(query, { $set: updatedChat });

        result
            ? res.status(200).send(`Successfully updated chat with id: ${id}`)
            : res.status(304).send(`Chat with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
module.exports = ChatRouter