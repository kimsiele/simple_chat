const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/Users";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const conn = mongoose.connection
conn.on("connection", (res) => {
    console.log("Database connected");
});
conn.on("disconnected", () => console.log("Database disconnected"));

conn.on("error", (err) => {
    console.log(Error, err.message);
    process.exit();
});


module.exports = conn;