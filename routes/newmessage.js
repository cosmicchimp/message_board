const express = require("express");
const router = express.Router();
require("dotenv").config();

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);
router.get("/", (req, res) => {
  res.render("new");
});
router.post("/", (req, res) => {
  const { username, message } = req.body;
  const upload = async () => {
    try {
      await sql`INSERT INTO messages VALUES(${username}, ${message}, ${new Date()})`;
      res.redirect("/");
    } catch (err) {
      console.error(err);
    }
  };
  upload();
});
module.exports = router;
