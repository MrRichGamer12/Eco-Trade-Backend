const express = require ("express");
const connectToDatabase = require("./services/database.service").connection
const UserRouter = require("./router/routes.users");
const ProductRouter = require ("./router/routes.products");

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
    
