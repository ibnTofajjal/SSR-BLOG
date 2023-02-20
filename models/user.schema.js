const { Schema, model } = require("mongoose");

// create a user shema
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: "/public/images/default.png",
    },
  },
  { timestamps: true }
);

// create a model using the schema
const User = model("User", userSchema);

module.exports = User;
