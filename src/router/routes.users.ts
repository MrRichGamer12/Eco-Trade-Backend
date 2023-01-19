// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections1 } from "../services/database.service";
import Users from "../models/Users";
// Global Config
export const UserRouter = express.Router();

UserRouter.use(express.json());
// GET
UserRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const user = (await collections1.User?.findOne(query)) as unknown as Users;

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
UserRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as Users;
        const result = await collections1.User?.insertOne(newUser);

        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// PUT
UserRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const updatedUser: Users = req.body as Users;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections1.User?.updateOne(query, { $set: updatedUser });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send("Caugth an problem");
    }
});
// DELETE
UserRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections1.User?.deleteOne(query);

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