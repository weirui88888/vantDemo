//所有问题数据模型

//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，表中的数据有id,problem等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const allproblemSchema = mongoose.Schema({
    id: String,
    problem: String,
    answer:String,
    model:String,
    type:String,
    hotflag:String,
    created_date:String
}, { collection: 'allProblem'})
//第二个参数，是告诉我们，以后我们要连接的表是哪个表

//导出model模块
const allproblem = module.exports = mongoose.model('allproblemSchema',allproblemSchema);