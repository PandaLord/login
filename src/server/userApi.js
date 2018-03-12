const express = require('express')
const router = express.Router()
const model = require('./db.js')

// 创建帐号接口
router.post("/createAccount",(req,res) => {
  let newAccount = new model.User({
    account: req.body.account,
    password: req.body.password,
  })
  model.User.findOne({account:req.body.account},
    function (err,data) {
      if (err) {
        console.log(err)
      }
      if (data) {
        res.send(null)
      } else {
        newAccount.save((err,data) => {
          if (err) {
            res.send(err)
          } else {
            res.send('success')
          }
      })
    }
  })
})

// 获取所有帐号的信息
router.get('/getAccount',(req,res) => {
  model.User.find((err,data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
      console.log('获取帐号列表成功')
    }
  })
})
// 登录
router.post("/login", (req,res) => {
  model.User.findOne({
    account:req.body.account,
    password: req.body.password,
  },function (err,data) {
    if (err) {
      console.log(err)
      res.send("failed")
      console.log("登录失败")
    }
    res.send(data)
  })
})

//删除
router.post("/delete",(req,res) => {
  model.User.remove(
    {account:req.body.account},
    function (err,data) {
    if (err) {
      console.log(err)
    }
    console.log("删除成功")
    res.send("delete success")
  })
})
// 更新
router.post("/update",(req,res) => {
  model.User.update(
    {account:req.body.oldAccount}
    ,
    {
    account:req.body.account,
    password:req.body.password,
    },
    function (err,data) {
    if (err) {
      console.log(err)
    }
    res.send('success')
    console.log("更改成功")
  })
})  
module.exports = router