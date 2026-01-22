let mongoose = require("mongoose");

let signUpSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  userPhone: {
    type: String,
    require: true,
  },
  userPassword: {
    type: String,
    require: true,
  },
});

let SignUpModel = mongoose.model("SignUpModel", signUpSchema);
module.exports = SignUpModel;
