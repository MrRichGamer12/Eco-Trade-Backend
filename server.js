const express = require ("express");
const connectToDatabase = require("./src/services/database.service").connection
const UserRouter = require("./src/router/routes.users");
const ProductRouter = require ("./src/router/routes.products");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080
const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(bodyParser.json());
app.use("/users", UserRouter);
app.use("/products", ProductRouter);
connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
    
