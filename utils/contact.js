// File System
const fs = require("fs");

// mengecek/membuat apakah folder ada atau tidak
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// mengecek/membuat apakah file ada atau tidak
const dataPath = "./data/contacs.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

// fungsi untuk membaca/mengambil semua data contact dan di convert kedalam json
const loadContact = () => {
  const file = fs.readFileSync(dataPath, "utf8");
  // mengubah data dari string menjadi object/array
  const contacts = JSON.parse(file);
  return contacts;
};

// fungsi mencari data contact berdasarkan (nama)
const findContact = (nama) => {
  const contacts = loadContact()
  const contact = contacts.find( contact => contact.nama === nama)
  return contact
}

// mengeluarkan fungsi agar bisa digunakan di file lain
module.exports = { loadContact, findContact };
