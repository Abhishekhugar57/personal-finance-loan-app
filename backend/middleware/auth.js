/*const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ✅ THIS PATH IS CORRECT

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { userAuth };
*/
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded; // ✅ FIX HERE

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    req.userId = user._id; // ✅ for account routes
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { userAuth };
