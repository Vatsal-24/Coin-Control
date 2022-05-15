const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a an email"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm new password"],
    validate: {
      //This will work on save and create
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords are not same!",
    },
  },
});

userSchema.pre("save", async function (next) {
  //run this function only if password was modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
