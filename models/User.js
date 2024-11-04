const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
    },
    profileBio: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    xLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
    telegramLink: {
      type: String,
    },
    discordLink: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    lineIDLink: {
      type: String,
    },
    uplandMeIGN: {
      type: String,
    },
    sandboxUsername: {
      type: String,
    },
    decentralandUsername: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
