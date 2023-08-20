const con = require('../DB/database');



exports.saveAddress = async (req, res) => {
    const id = req.params.id;
    const city = req.body.city;
    const street = req.body.street;
    const state = req.body.state;
    const country = req.body.country;
    const phone = req.body.phone;


    await con.query(
        `INSERT INTO addresses (user_id, city,street, state, country, phone) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, city, street, state, country, phone],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
};

exports.getAddress = async (req, res) => {
    const id = req.params.id;

    await con.query(
        `SELECT * FROM addresses WHERE user_id =?`,
        [id],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
}


exports.insertOrder = async (req, res) => {
    const { user_id, product_id, quantity } = req.body; // Destructure data from the request body

    // Use try-catch for error handling
    try {
        await con.query(
            `INSERT INTO orders_details (user_id, product_id, quantity) VALUES (?, ?, ?)`,
            [user_id, product_id, quantity],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('An error occurred during insertion.');
                }
                res.send(result);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
};
