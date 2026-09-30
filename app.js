const express = require("express");
const expressLayout = require("express-ejs-layouts");

const { loadContact, findContact } = require("./utils/contact");
const app = express();
const port = 3000;

// Menggunakan EJS
app.set("view engine", "ejs");

// Third-party Middleware
app.use(expressLayout);

// Built-in Middleware
app.use(express.static("public"));

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

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman about",
    layout: "layouts/main-layout",
  });
});

// menampilkan seluruh data contact
app.get("/contact", (req, res) => {
  const contacts = loadContact()
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

// menampilkan data dengan params (nama)
app.get("/contact/:nama", (req,res) => {
    const contact = findContact(req.params.nama)

    res.render('detail', {
      title : 'Halaman detail Contact',
      layout : 'layouts/main-layout',
      contact,
    })
})

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 NOT FOUND!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
