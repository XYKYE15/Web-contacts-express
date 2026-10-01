const express = require("express");
const expressLayout = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const {
  loadContacts,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contact");

const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express();
const port = 3000;

// Menggunakan EJS
app.set("view engine", "ejs");

// Third-party Middleware
app.use(expressLayout);

// Built-in Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie : {maxAge : 6000},
  secret : 'secret',
  resave : true,
  saveUninitialized : true,
}))
app.use(flash())

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
    msg : req.flash('msg'),
  });
});

// menampilkan halaman add contact
app.get("/contact/add", (req, res) => {
  res.render("addContact", {
    title: "Form Tambah Contact",
    layout: "layouts/main-layout",
  });
});

// Proses mengirim data contact dan memvalidasi data
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Contact sudah terdaftar!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "No handphone tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("addContact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body)
      // mengirim flash message
      req.flash('msg', 'Data Contact berhasil ditambahkan...')
      res.redirect('/contact')
    }
  },
);

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
