const User = require('../models/User');
const UserValidation = require('../utils/UserValidation');
const jwt = require('jsonwebtoken'); 

const newUser = async (req, res) => {
  const User = req.body;
  
  const UserValid = UserValidation.userValidation(User);
  console.log(UserValid)
  if (!UserValid.valid) {
    return res.json({message: UserValid.log, statusCode: UserValid.satusCode});
  }

  // const user = await User.create({displayName, email, password, image});

  //criar jwt

  return res.json({token: jwt, statusCode: UserValid.statusCode});
}

const allUsers = async (req, res) => {
  
}
const deleteUserMe = async (req, res) => {
  
}
const searchUserId = async (req, res) => {
  
}

const userExists = async (email) => {
  
}

module.exports = {
  newUser,
  allUsers,
  deleteUserMe,
  searchUserId
}