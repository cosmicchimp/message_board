const express = require("express");
const app = express();
const http = require("http");
const port = 3131;
const path = require("node:path");
const indexRouter = require("./routes/index.js");
const newRouter = require("./routes/newmessage.js");
const messageRouter = require("./routes/messagerouter.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.locals.messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
app.use("/", indexRouter);
app.use("/message", messageRouter);
app.use("/newmessage", newRouter);
app.listen(port, () => {
  console.log("App is running on " + port);
});
