const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Mongo DB connected successfully");
    })
    .catch((err) => {
        console.log("Error connecting to mongo DB", err);
    });

const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./graphql/schema");

app.use(cors());
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.use("/", express.static("docs"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
