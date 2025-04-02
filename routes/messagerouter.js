const express = require("express");
const router = express.Router();
router.get("/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = req.app.locals.messages[messageId];
  console.log(message, messageId);

  res.render("messageInfo", {
    message: message,
  });
});
module.exports = router;
