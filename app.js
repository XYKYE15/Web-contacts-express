const express = require("express");
const expressLayout = require("express-ejs-layouts");

const { loadContacts, findContact, addContact } = require("./utils/contact");
const app = express();
const port = 3000;

// Menggunakan EJS
app.set("view engine", "ejs");

// Third-party Middleware
app.use(expressLayout);

// Built-in Middleware
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Rizki Rinaldi",
      email: "rizkirinaldi@gmail.com",
    },
    {
      nama: "Robby",
      email: "robby@gmail.com",
    },
    {
      nama: "Tony",
      email: "tony@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Rizki Rinaldi",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

// menampilkan halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman about",
    layout: "layouts/main-layout",
  });
});

// menampilkan halaman data contact
app.get("/contact", (req, res) => {
  const contacts = loadContacts();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

// menampilkan halaman add contact
app.get("/contact/add", (req, res) => {
  res.render("addContact", {
    title: "Form Tambah Contact",
    layout: "layouts/main-layout",
  });
});

// Proses mengirim data contact
app.post("/contact", (req, res) => {
  addContact(req.body)
  res.redirect('/contact')
});

// menampilkan data dengan params (nama)
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detail", {
    title: "Halaman detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 NOT FOUND!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
