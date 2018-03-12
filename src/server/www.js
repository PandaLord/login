const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const userApi = require("./userApi")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))


// 后端api路由
app.use('/api', userApi)

// 监听端口
app.use((req, res, next) => {
  var err = new Error('This page not found')
  err.status = 404
  next(err)
})


app.listen(3000, () => {
  console.log('Server running in port 3000...')
})


// app.use(api);
// // 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// app.use(express.static(path.resolve(__dirname, '../dist')))
// // 因为是单页应用 所有请求都走/dist/index.html

// // 监听8088端口
// app.listen(8088);
// console.log('success listen…………');