require("dotenv").config();
const express = require("express");
const { white, bold } = require("colorette");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const database = require("./database/database");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://grocery-frontend.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contact", contactRoute);

// Routes 
app.get("/", (req, res) => {
  res.send("index api");
});

// Error Middleware
app.use(errorHandler);
database();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(white(bold("Server is running on PORT " + PORT + " !")));
});