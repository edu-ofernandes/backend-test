const User = require('../model/User')

const allUser = async (req, res) =>{
  try {
    const data = await User.allUser();

    return res;
  } catch (error) {
    return res.status(500).json({error: "erro 500"})
  }
};

module.exports = allUser