'use strick'
const addUserModel = require('../model/chat_model');

module.exports = {
    joiningForm: (req, res) => {
        if (!req.body.username) {
            return res.status(400).send({ message: "username is empty!" });
        } else {
            createUser: (req, res) => {
                var userData = req.body;
                addUserModel.createUser(userData, (data) => {
                    res.render('joining_form');
                    console.log("Joining Successful");
                });

            }
        }
    }
}