const { Router } = require("express");

const router = Router();

// GET BLOG PAGE
router.get("/add-blog", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

module.exports = router;
