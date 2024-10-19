const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/JurisVault')
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

const newSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  metamaskId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
