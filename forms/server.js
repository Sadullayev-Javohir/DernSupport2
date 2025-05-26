const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Frontend fayllar uchun statik yo'l (public papka)
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/forms', express.static(path.join(__dirname, '../forms')));
// ...existing code...

// JSON faylga foydalanuvchilarni yozish/oqish uchun
const usersFilePath = path.join(__dirname, './users.json');

// Signup sahifasi
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/signup.html'));
});

// Login sahifasi
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// POST /register – Ro‘yxatdan o‘tish
app.post('/register', (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Barcha maydonlar to'ldirilishi kerak!" });
  }

  let users = [];
  if (fs.existsSync(usersFilePath)) {
    users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  }

  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: "Bu email bilan foydalanuvchi allaqachon mavjud." });
  }

  users.push({ fullName, email, password });
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" });
});

// POST /login – Tizimga kirish
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email va parol kiritilishi shart" });
  }

  if (!fs.existsSync(usersFilePath)) {
    return res.status(401).json({ message: "Foydalanuvchi topilmadi." });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: "Muvaffaqiyatli kirdingiz!" });
  } else {
    res.status(401).json({ message: "Email yoki parol noto‘g‘ri." });
  }
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port} da ishga tushdi`);
});
