const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = "navcho";
const saltRounds = 10;

const register = async ({ email, username, password }) => {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt);

  try {
    const user = new User({ email, username, password: hash });
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

const login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        throw { message: 'User Not Found' };
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { message: 'Password does not match' };

    let token = jwt.sign({ _id: user._id, email: user.email, username: user.username, roles: ['admin']}, secret);
    return token;
}

// const register =

module.exports = {
  register,
  login
};
