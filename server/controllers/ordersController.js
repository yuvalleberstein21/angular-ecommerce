const con = require('../DB/database');



exports.saveAddress = async (req, res) => {
    const id = req.params.id;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const phone = req.body.phone;


    await con.query(
        `INSERT INTO addresses (user_id, city, state, country, phone) VALUES (?, ?, ?, ?, ?)`,
        [id, city, state, country, phone],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
};
