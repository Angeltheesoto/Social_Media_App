const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Hey its auth route.");
});

// REGISTER | create new user
router.post("/register", async (req, res) => {
  // This sends data to mongoDB
  try {
    // Encrypted new password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // creates new user using schema from Users
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // Saves users and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// LOGIN | Gets user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password!");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(`Could not get user login: ${err}`);
  }
});

module.exports = router;
