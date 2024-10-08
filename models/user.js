const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/CRUD2").then(() => {
  console.log("> Connected to MongoDB");
});

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  gender: { type: String, require: true },
  age: { type: String, require: true },
  mobileNumber: { type: Number, require: true },
});

module.exports = mongoose.model("user", userSchema);
