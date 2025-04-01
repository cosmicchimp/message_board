const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("new");
});
router.post("/", (req, res) => {
  const { username, message } = req.body;
  req.app.locals.messages.push({
    text: message,
    user: username,
    added: new Date(),
  });
  res.redirect("/");
});
module.exports = router;
