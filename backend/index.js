const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter");
const ProductsRouter = require("./Routes/ProductsRouter");
const cors = require("cors");
const port = 8080;
const mongoose = require("mongoose");
 
require("dotenv").config();
require("./Models/db");
const PORT = process.env.Port || 8080;
app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products",ProductsRouter);



async function connectDb() {
  await mongoose.connect(
    "mongodb://localhost:27017/",

    {
      dbName: "auth-db",
    }
  );
  console.log("Database is connected");
}

connectDb().catch((err) => {
  console.error(err);
});

app.listen(port, () => {
  console.log("server running on port", port);
});
