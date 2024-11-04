const mongoose = require("mongoose");
require("dotenv").config();
const CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
const connect = async () => {
  mongoose
    .connect(CONNECTION_URL)
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = connect;
