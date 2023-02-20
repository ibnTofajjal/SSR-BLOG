const { Router } = require("express");
const User = require("../models/user.schema");

// DEFINE ROUTER FOR USER
const router = Router();

// GET SIGNUP PAGE
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// GET SIGNIN PAGE
router.get("/signin", (req, res) => {
  return res.render("signin");
});

// POST SIGNIN PAGE
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    // set the token in the cookie
    res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect Email Or Password" });
  }
});

// POST SIGNUP PAGE
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({ fullName, email, password });
  return res.redirect("/");
});

// EXPORT ROUTER
module.exports = router;
