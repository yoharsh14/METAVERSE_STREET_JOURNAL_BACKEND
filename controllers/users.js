const User = require("../models/User");
const generateTokenAndSetCookie = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, username, password, repeatpassword } =
      req.body;
    if (password != repeatpassword) {
      return res.status(400).json({ error: "Passord don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(404).json({ error: "username already exist" });
    }
    const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      profilePic,
      profileBio: "",
      phoneNumber: "",
      xLinking: "",
      linkedinLink: "",
      telegramLink: "",
      discordLink: "",
      youtubeLink: "",
      lineIDLink: "",
      uplandMeIGN: "",
      sandboxUsername: "",
      decentralandUsername: "",
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (e) {
    console.log("Error in login controller", e.message);
    res.status(404).json({ error: e });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password || " ",
      user.password || " "
    );
    if (!user || !isPasswordCorrect) {
      res.status(400).json({ error: "Invalid credentials" });
    } else {
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profilePic: user.profilePic,
      });
    }
  } catch (e) {
    console.log("Error in login controller", e.message);
    res.status(404).json({ error: e });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ messsage: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login, logout };
