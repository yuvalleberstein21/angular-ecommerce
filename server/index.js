const express = require('express');
const cors = require('cors');
const app = express();
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const session = require('express-session');


app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE',]
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
    session({
        secret: 'secret_key', // Replace with your secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Change to true if using HTTPS
    })
);


app.use('/api', productsRoutes);
app.use('/api', usersRoutes);
app.use('/api', ordersRoutes);



app.listen(5001, () => console.log('Server is running on port 5001'));