const express = require("express");
const app = express();
const path = require("node:path");
const categoryRouter = require("./routes/categoryRouter.js");
const itemRouter = require("./routes/itemRouter.js");

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/category", categoryRouter);
app.use("/item", itemRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
