'use strick'
const mongoose = require('mongoose');
const db = require("../configdb/configdb");
const Schema = mongoose.Schema;

const users_schema = new Schema({
    _id: {
        type: Number
    },
    username: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});
var users = mongoose.model('Users', users_schema);

module.exports = {
    createData: (inputdata, callback) => {
        userData = new users(inputdata);
        userData.save((err, data) => {
            if (err) throw err;
            return callback(data);
        });


    }
}