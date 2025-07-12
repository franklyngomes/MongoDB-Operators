const mongoose = require('mongoose')

const databaseCon = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL)
    if(connection){
      console.log("Database Connection Successful")
    }
  } catch (error) {
    console.log("Database Connection Failed", error)
  }
}
module.exports = databaseCon