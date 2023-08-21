const con = require('../DB/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    con.query("SELECT email FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.json(err)
        if (result.length > 0) return res.send({ message: "User already exists !" });

        let hashedPassword = await bcrypt.hash(password, 8);
        await con.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hashedPassword],
            (err, result) => {
                if (err) return res.json(err);
                return res.status(200).send({ result });
            }
        )
    })
}

// LOGIN AUTH

exports.login = async (req, res) => {
    const { email, password } = req.body;
    await con.query("SELECT * FROM users WHERE email =?", email, (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    const token = jwt.sign({ email: result[0].email }, 'secret_key');
                    req.session.loggedInUser = result[0];
                    res.send({ token: token, data: result });
                }
                else {
                    res.send({ message: "Wrong email/password combination !" });
                }
            })
        }
        else {
            res.send({ message: "User doen't exist" });
        }
    });
};

// // LOGOUT AUTH 
exports.logout = async (req, res) => {

    await req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send({ message: 'Error occurred during logout' });
        } else {
            res.send({ message: 'Logged out successfully' });
        }
    });
}