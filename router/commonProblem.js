//引入express模块
const express = require("express");

//定义路由级中间件
const router = express.Router();

//引入常见问题数据模型模块
const problem = require("../models/allProblem");


// 根据model查询常见问题模块
router.get("/getModels", (req, res) => {
    problem.aggregate([{$group : {_id : "$model", total : {$sum : 1}}}])
      .then(problems => {
        problems.forEach(function(elem,index){
          switch(elem["_id"])
          {
          case "平台相关":
              elem["firsttype"] = "易宝支付"// 这里每个模块下面的第一个分类是我写死的，理论上应该是通过数据库操作,得到一个type类型数组，然后取第一个元素的,但是能力有限，不会～，有大神会的，可以私信我
              elem["iconName"] = "ptxg";
              elem["model"] = elem["_id"];
              elem["sortnum"] = 6;
            break;
          case "资金与发票":
            elem["iconName"] = "zjyfp";
            elem["model"] = elem["_id"];
            elem["sortnum"] = 5;
            elem["firsttype"] = "发票";
            break;
          case "账户与交易":
            elem["iconName"] = "zfcp";
            elem["model"] = elem["_id"];
            elem["sortnum"] = 4;
            elem["firsttype"] = "结算";
            break;
          case "考试网业务":
            elem["iconName"] = "kswyw";
            elem["model"] = elem["_id"];
            elem["sortnum"] = 3;
            elem["firsttype"] = "缴费";
            break;
          case "支付产品":
            elem["iconName"] = "zfcp";
            elem["model"] = elem["_id"];
            elem["sortnum"] = 2;
            elem["firsttype"] = "网银支付";
            break;
          case "商户入网":
            elem["iconName"] = "shrw";
            elem["model"] = elem["_id"];
            elem["sortnum"] = 1;
            elem["firsttype"] = "商户合作";
            break;
          default:
            
          }
        })
        res.json({
          code:"success",
          data:problems
        });
      })
      .catch(err => {
        res.json(err);
      });
  });

  // 查询热门问题
router.get("/getHotProblem", (req, res) => {
  problem.find({"hotflag":"1"},{problem:1})
    .then(problem => {
      let returnProblem = [];
      problem.forEach(function(elem,index){
        returnProblem.push({
          id:elem["_id"],
          problem:elem.problem
        })
      })
      res.json({
        code:"success",
        data:returnProblem
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// 模糊查询实现方法
//这里通过字符串构造不行
//var qs = '/'+req.query.search+'/';
//通过使用RegExp，来构建正则表达式对象，可以
router.get("/searchPro", (req, res) => {
  var qs = new RegExp(req.query.searchkey);
  problem.find({'problem':qs},{problem:1})
    .then(problem => {
      let searchProblem = [];
      problem.forEach(function(elem,index){
          searchProblem.push({
          id:elem["_id"],
          problem:elem.problem
        })
      })
      res.json({
        code:"success",
        data:searchProblem
      });
    })
    .catch(err => {
      res.json(err);
    });
});


// 根据id查询详情问题
router.get("/getbyid", (req, res) => {
  var id = req.query.id;
  problem.find({'_id':id})
    .then(problem => {
      res.json({
        code:"success",
        data:problem
      });
    })
    .catch(err => {
      res.json(err);
    });
});

//查询二级页面（分类页面）的分类
router.get("/getTypes", (req, res) => {
  var model= req.query.model;
  problem.distinct("type",{"model" : model })
  .then(types => {
    res.json({
      code:"success",
      data:types
    })
  })
  .catch(err => {
    res.json(err);
  });
});

// 根据分类和模块名查询列表

router.get("/getByModelAndView", (req, res) => {
  var model= req.query.model;
  var type = req.query.type;
  problem.find({model:model,type:type},{problem:1})
  .then(lists => {
    res.json({
      code:"success",
      data:lists
    })
  })
  .catch(err => {
    res.json(err);
  });
});





  module.exports = router;