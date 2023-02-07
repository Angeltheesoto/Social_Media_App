const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("user route");
});

// update user
router.post("/:id", async (req, res) => {
  // the user id is the same in url or user is admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // if user tries to update password.
    if (req.body.password) {
      try {
        // wait for password to be crypted then store the new pass
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    // update user
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        // sets all inputs in body | updates users info
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // finds user and deletes it by id.
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// get a user
router.get("/:id", async (req, res) => {
  try {
    // finds user by id
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc; // carries our whole obj here.
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        // updates users followers
        await user.updateOne({ $push: { followers: req.body.userId } });
        // updates current user followings
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed.");
      } else {
        res.status(403).json("You already follow this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself.");
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        // updates users followers
        await user.updateOne({ $pull: { followers: req.body.userId } });
        // updates current user followings
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed.");
      } else {
        res.status(403).json("You don't follow this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself.");
  }
});

module.exports = router;