const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: req.app.locals.messages,
  });
});
module.exports = router;
