// External Dependencies
const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const mongoDB = require ("mongodb");
const client = new mongoDB.MongoClient("mongodb+srv://MrRichGamer:MrRichGamer.12@eco-trade.zbhmzeu.mongodb.net/?retryWrites=true&w=majority");
// Global Config
const UserRouter = express.Router();

UserRouter.use(express.json());
// GET
UserRouter.get("/:id", async (req, res) => {
    const id = req?.params?.id;
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')

    try {
        
        const query = { _id: new ObjectId(id) };
        const user = await collections1.findOne(query);

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
UserRouter.post("/", async (req, res) => {
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')
    try {
        const newUser = req.body;
        const result = await collections1.insertOne(newUser);

        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// PUT
UserRouter.put("/:id", async (req, res) => {
    await client.connect();
    let collections1 = client.db('Eco-Trade').collection('Users')
    const id = req.params.id;

    try {
        const updatedUser = req.body;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections1.updateOne(query, { $set: updatedUser });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// DELETE
UserRouter.delete("/:id", async (req, res) => {
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