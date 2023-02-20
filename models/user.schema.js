const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");
const { generateToken } = require("../services/authentication");

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

// Pre save hook with hmac password
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.password = hashedPassword;
  user.salt = salt;

  next();
});

// compare password
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const newHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== newHashedPassword)
      throw new Error("Password not match");

    // return the token
    const token = generateToken(user);
    return token;
  }
);

// create a model using the schema
const User = model("User", userSchema);

module.exports = User;
