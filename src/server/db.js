const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const userSchema = new Schema ({
  account: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  }
})

const Models = {
  User: mongoose.model("User",userSchema)
}

mongoose.connect("mongodb://127.0.0.1:3000/user") //这里不能够加端口号，否则会连接不上

const db = mongoose.connection

db.on("error", function (err) {
  console.log("Database connection error")
  console.log(err)
})
db.once("open",function () {
  console.log('The database has connected')
})

module.exports = Models