const con = require('../DB/database');



exports.getAllProducts = async (req, res) => {
    await con.query('SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.stock, c.title AS category FROM products p JOIN categories c ON p.cat_id = c.id;', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};

exports.getProductByID = async (req, res) => {
    const id = req.params.id;
    await con.query(`SELECT products.id, products.title, products.image, products.images, products.description, products.price, products.stock, categories.title AS category
    FROM products
    JOIN categories ON products.cat_id = categories.id
    WHERE products.id = ${id};`, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};
