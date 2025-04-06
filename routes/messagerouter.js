const express = require("express");
const router = express.Router();
require("dotenv").config();

const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

router.get("/:id", async (req, res, next) => {
  const messageId = parseInt(req.params.id);

  try {
    const data =
      await sql`SELECT "user", msg, date FROM messages WHERE id = ${messageId}`;

    if (data.length === 0) {
      return res.status(404).send("Message not found.");
    }

    // Format the single message
    const message = {
      user: data[0].user,
      text: data[0].msg,
      added: new Date(data[0].date),
    };

    res.render("messageInfo", { message });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
