const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/User.js');
const PlaceModel = require('./models/Place.js');
const BookingModel = require('./models/Booking.js');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))

mongoose.connect(process.env.DB_URL);

app.get('/test', (req, res) => {
  res.status(200).json('OK');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    });
    res.status(200).json(user);
  } catch(err) {
    res.status(403).json(err.message);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email
  });
  if (user) {
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (checkPassword) {
      jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name
      }, process.env.TOKEN_SECRET_KEY, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).status(200).json({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      });
    } else {
      res.status(401).json('Pass not ok');
    }
  } else {
    res.status(404).json('Not found user.')
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, {}, async(err, userInfo) => {
      if (err) throw err;
      const {name, email, _id} = await UserModel.findById(userInfo.id);
      res.status(200).json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').status(200).json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  });
  res.status(200).json(newName);
});

const photosMiddleWare = multer({
  dest: 'uploads'
})

app.post('/upload', photosMiddleWare.array('photos', 100), (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace('uploads/', ''));
  }
  res.status(200).json(uploadFiles);
});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    price,
    maxGuests
  } = req.body;
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, {}, async (err, userInfo) => {
    if (err) throw err;
    const place = await PlaceModel.create({
      owner: userInfo.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
      maxGuests
    });
    res.status(200).json(place);
  });
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, {}, async (err, userInfo) => {
    if (err) throw err;
    const { id } = userInfo;
    res.status(200).json(await PlaceModel.find({owner: id}));
  });
});

app.put('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    price,
    maxGuests
  } = req.body;
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, {}, async (err, userInfo) => {
    if (err) throw err;
    const placeDoc = await PlaceModel.findById(id);
    if (userInfo.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        price,
        maxGuests
      })
      await placeDoc.save()
      res.status(200).json('Edit complete');
    }
  });
})

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await PlaceModel.findById(id));
});

app.get('/places', async (req, res) => {
  res.status(200).json(await PlaceModel.find())
});

app.post('/bookings', (req, res) => {
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, {}, async (err, userInfo) => {
    if (err) throw err;
    const { id } = userInfo;
    const bookingInfo = await BookingModel.create({
      place,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      numberOfGuests,
      name,
      phone,
      price,
      userId: id
    });
    return res.status(200).json(bookingInfo._id);
  })
});

app.get('/bookings', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, {}, async (err, userInfo) => {
    if(err) throw err;
    const bookings = await BookingModel.find({
      userId: userInfo.id
    }).populate('place');
    return res.status(200).json(bookings);
  });
});

app.get('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  return res.status(200).json(await BookingModel.findById(id).populate('place'));
})

app.listen(8080);