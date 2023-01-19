import express from "express";
import { connectToDatabase } from "./services/database.service"
import { UserRouter } from "./router/routes.users";
import { ProductRouter } from "./router/routes.products";

const port = process.env.PORT || 8080
const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
connectToDatabase()
    .then(() => {
        app.use("/user", UserRouter);
        app.use("/product", ProductRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
    
