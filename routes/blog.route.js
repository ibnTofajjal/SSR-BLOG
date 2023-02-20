const { Router } = require("express");

const router = Router();

// GET BLOG PAGE
router.get("/add-blog", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

// POST BLOG
router.post("/", (req, res) => {
  console.log(req.body);
  return res.redirect("/");
});

module.exports = router;
