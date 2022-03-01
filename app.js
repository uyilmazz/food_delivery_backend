const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost:27017/food_delivery', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log('Database connection'))
    .catch(err => console.log('Database connection error' + err));

app.use(express.json());
app.use(session({
    secret: 'my_session_key',
    // store: MongoStore.create({ mongoUrl: 'mongodb+srv://uyilmaz:pass1234@cluster0.xnbp1.mongodb.net/smart-edu?retryWrites=true&w=majority' }),
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    req.session.userID = '6214c15f9ccae1c60c0eca14';
    next();
});

const foodRouter = require('./routers/foodRouter');
const authRouter = require('./routers/authRouter');

app.use('/', foodRouter);
app.use('/', authRouter);

app.listen(3000, () => {
    console.log('App listening from 3000 port');
});