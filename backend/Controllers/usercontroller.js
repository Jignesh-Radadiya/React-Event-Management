const User = require('../Models/usermodel');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const newUser = new User({ name, email, mobile, password });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};
