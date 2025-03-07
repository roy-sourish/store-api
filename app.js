require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server listening on PORT ${port}...`));
  } catch (error) {
    console.error(error);
  }
};

start();
