import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections2 } from "../services/database.service";
import Product from "../models/Product";
// Global Config
export const ProductRouter = express.Router();

ProductRouter.use(express.json());
// GET
ProductRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const user = (await collections2.Product?.findOne(query)) as unknown as Product;

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
ProductRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as Product;
        const result = await collections2.Product?.insertOne(newUser);

        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// PUT
ProductRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const updatedProduct: Product = req.body as Product;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections2.Product?.updateOne(query, { $set: updatedProduct });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// DELETE
ProductRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections2.Product?.deleteOne(query);

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