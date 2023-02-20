const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(3000, () => {
  console.log(`Server started on port: ${PORT}`);
});
