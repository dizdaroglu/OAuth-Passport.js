const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

app.set('view engine', 'ejs');

//connect to mongodb
mongoose.connect(keys.mongodb.mongoURI, () => {
    console.log('connected mongoDB');
});

app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000);