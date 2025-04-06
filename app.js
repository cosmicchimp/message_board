const express = require("express");
const app = express();
const http = require("http");
const port = 3131;
const path = require("node:path");
const indexRouter = require("./routes/index.js");
const newRouter = require("./routes/newmessage.js");
const messageRouter = require("./routes/messagerouter.js");
require("dotenv").config();

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);
const createTable = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS messages(id SERIAL PRIMARY KEY, "user" VARCHAR(25), msg VARCHAR(255), date TIMESTAMP)`;
    console.log("Messages table ensured.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Initialize table creation
createTable();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  async (req, res, next) => {
    results = await sql`SELECT "user", msg, date, id FROM messages`;
    const messages = results.map((message) => ({
      id: message.id,
      user: message.user,
      text: message.msg,
      added: new Date(message.date),
    }));
    app.locals.messages = messages;
    req.messages = messages;
    next();
  },
  indexRouter
);
app.use("/message", messageRouter);
app.use("/newmessage", newRouter);
app.listen(port, () => {
  console.log("App is running on " + port);
});
