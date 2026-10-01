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
const loadContacts = () => {
  const file = fs.readFileSync(dataPath, "utf8");
  // mengubah data dari string menjadi object/array
  const contacts = JSON.parse(file);
  return contacts;
};

// fungsi mencari data contact berdasarkan (nama)
const findContact = (nama) => {
  const contacts = loadContacts()
  const contact = contacts.find( contact => contact.nama === nama)
  return contact
}

// menuliskan/ menimpa file contact.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync(dataPath, JSON.stringify(contacts))
  
}

// menambahkan data baru
const addContact = (contact) => {
  const contacts = loadContacts()
  contacts.push(contact)
  saveContacts(contacts)
}

// cek nama yang duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContacts()
  return contacts.find(contact => contact.nama === nama)
}


// mengeluarkan fungsi agar bisa digunakan di file lain
module.exports = { loadContacts, findContact, addContact, cekDuplikat };
