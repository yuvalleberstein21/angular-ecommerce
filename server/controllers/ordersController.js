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
