const jwt = require("jsonwebtoken");
const express = require('express')
const ObjectId = require( "mongodb").ObjectId;
const mongoDB = require ("mongodb");
const client = new mongoDB.MongoClient("mongodb+srv://MrRichGamer:MrRichGamer.12@eco-trade.zbhmzeu.mongodb.net/?retryWrites=true&w=majority");

// Global Config
const ProductRouter = express.Router();
// GET
ProductRouter.get("/", async (req, res) => {
    await client.connect();
    let collections2 = client.db('Eco-Trade').collection('Products')

    try {
        const token = req.headers.authorization;
        const secretKey = "b1cebf58ce03b245a33a8a670c6aeff5c46d75349b4593b2e4bf19ec4ac6c4e3aec00d3aea86f12804a654c66f5dc3a07ca14b237430597ffb272347bfdae2f7";
        jwt.verify(token, secretKey, {algorithms: ['HS256']});
        const product = await collections2.find({}).toArray();
        if (product) {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(404).send("Unable to find any documents in the collection");
    }
});

// POST
ProductRouter.post("/", async (req, res) => {
    await client.connect();
    let collections2 = client.db('Eco-Trade').collection('Products')
    const token = req.headers.authorization;
  const secretKey = "b1cebf58ce03b245a33a8a670c6aeff5c46d75349b4593b2e4bf19ec4ac6c4e3aec00d3aea86f12804a654c66f5dc3a07ca14b237430597ffb272347bfdae2f7";
  const decoded = jwt.verify(token, secretKey); 
  const userId = decoded.userId;
    try {
        const product = req.body;
        console.log(product);
        product.userId = userId;

        const result = await collections2.insertOne(product);

        result
            ? res.status(201).send(`Successfully created a new product with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new product.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
module.exports = ProductRouter