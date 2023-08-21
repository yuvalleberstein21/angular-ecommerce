const express = require('express');
const cors = require('cors');
const app = express();
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const bodyparser = require('body-parser');
const session = require('express-session');
const stripe = require('stripe')("sk_test_51Nh66tLzupgPvagx6ffFsi9PUdFNfVKqzqLnRYB02GIXQXoNTs1SQQ6HAtY8sj7OuwoWamAKM7jKhQXoBl7EGGhk004rt83wBb");

app.use(bodyparser.urlencoded({ extended: false }));


app.use(bodyparser.json())

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

app.post('/api/payment', async (req, res) => {
    try {
        token = req.body.token;
        const customer = stripe.customers.create({
            email: 'example@example',
            source: token.id
        }).then((customer) => {

            return stripe.charges.create({
                amount: 1000,
                description: "Test purchase order payment method with customer id",
                currency: "USD",
                customer: customer.id

            });
        }).then((charge) => {
            res.json({
                data: "success",
            });
        })
            .catch((error) => {
                res.json({
                    data: "failure",
                });
            });
        return true;
    } catch (error) {
        return false;
    }
});


app.use('/api', productsRoutes);
app.use('/api', usersRoutes);
app.use('/api', ordersRoutes);



app.listen(5001, () => console.log('Server is running on port 5001'));