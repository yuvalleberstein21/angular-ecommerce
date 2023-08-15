const express = require('express');
const cors = require('cors');
const con = require('./DB/database');
const app = express();



app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE',]
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/api/getAllProducts', async (req, res) => {
    await con.query('SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.stock, c.title AS category FROM products p JOIN categories c ON p.cat_id = c.id;', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.listen(5001, () => console.log('Server is running on port 5001'));