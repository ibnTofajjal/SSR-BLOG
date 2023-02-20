const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const checkAuthenticationCookie = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));

// Mongoose Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then((e) => console.log("MongoDB Connected"));

// Static Files
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/user", userRoute);

// Server
app.listen(3000, () => {
  console.log(`Server started on port: ${PORT}`);
});
