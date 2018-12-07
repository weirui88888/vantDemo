//app.js文件

//1.引入express模块
const express = require('express')

const commonProblem = require('./router/commonProblem')

const mongoose = require("mongoose");

const bodyParser = require("body-parser")

//这一句是连接上数据库
var db = mongoose.connect('mongodb://localhost:27017/problem');

//2.创建app对象
const app = express()

app.use('/json',commonProblem)

//定义服务启动端口
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})