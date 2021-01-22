
const allUsers = async (req, res) => {
  try {
    
    return res.json({name:"edu"});

  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = allUsers;
