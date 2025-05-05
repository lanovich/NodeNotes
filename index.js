const http = require("http");
const chalk = require("chalk");
const path = require("path");
const express = require("express");
const {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  updateNote,
} = require("./notes.controller");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await updateNote(req.params.id, req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server started on port ${PORT}`));
});
