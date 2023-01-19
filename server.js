const express = require ("express");
const connectToDatabase = require("./src/services/database.service").connection
const UserRouter = require("./src/router/routes.users");
const ProductRouter = require ("./src/router/routes.products");

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
    .catch((error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
    
