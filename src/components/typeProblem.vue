<template>
  <div id="typePage" v-cloak>
    <header>
      <van-tabs @click="switchType" v-model="active" color="#00cfac">
        <van-tab v-for="item in headerTypeList" :title="item">
          <ul class="questionList">
            <li
              class="queryQuestion"
              v-for="query in queryQuestionArray"
              @click="toDetail(query._id)"
            >{{query.problem}}</li>
          </ul>
        </van-tab>
      </van-tabs>
    </header>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import request from '@/common/js/request';
export default {
  name: "typeProblem",
  data: function() {
    return {
      title: "二级页面",
      model: "",
      active: 0,
      headerTypeList: [],
      queryQuestionArray: [],
      getModelTypeUrl: "./getTypes", //查询模块中的分类
      getModelListUrl: "./getByModelAndView", //根据模块名和模块分类，获取问题列表
    };
  },
  methods: {
    switchType: function(index, type) {
      this.getModelList(this.model, type);
      this.$myTool.setSession("typeIndex", index);
    },
    //查询模块头部分类
    getTypes: function(model) {
        request({
            url:this.getModelTypeUrl,
            methods:"get",
            params: {
              model: model
            },
        })
        .then(response => {
            if(response.data.code == "success"){
              this.headerTypeList = response.data.data;
            }
        })
        .catch(() => {
            this.headerTypeList = [];
            // 可以写个404页面，当查询报错时，统一跳转到404页面
        });
    },
    //根据模块名和模块分类，获取问题列表
    getModelList: function(model, type) {
      this.queryQuestionArray = [];
      request({
            url:this.getModelListUrl,
            methods:"get",
            params: {
              model: model,
              type:type
            },
        })
        .then(response => {
            if(response.data.code == "success"){
                    this.queryQuestionArray = response.data.data;
            }
        })
        .catch(() => {
            this.queryQuestionArray = [];
            // 可以写个404页面，当查询报错时，统一跳转到404页面
        });
    },
    //跳转至详情页面
    toDetail: function(id) {
        this.$router.push({ path: 'detail', query: { id: id }})
    }
  },
  mounted: function() {
    //模块
    var model = decodeURI(this.$myTool.getQueryString("model"));
    //分类
    //var type = decodeURI(this.$myTool.getQueryString("type"));
    //通过上面两种方式，拿不到model和type,用下面this.$route.query是正确的方法
    var model = this.$route.query.model;
    var type = this.$route.query.type;
    this.model = model;
    this.getTypes(model);
    //拿上次的缓存index
    var lastTypeIndex = this.$myTool.getSession("typeIndex");

      request({
            url:this.getModelTypeUrl,
            methods:"get",
            params: {
              model: model
            },
        })
        .then(response => {
            if(response.data.code == "success"){
              this.headerTypeList = response.data.data;
            }
            if (lastTypeIndex) {
              this.active = lastTypeIndex;
              this.getModelList(model, this.headerTypeList[Number(lastTypeIndex)]);
            } else {
              this.getModelList(model, type);
            }
        })
        .catch(() => {
            this.headerTypeList = [];
            // 可以写个404页面，当查询报错时，统一跳转到404页面
        });
  },
  computed: {},
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style scoped>
header .van-tab--active {
    font-weight: 500;
    color: #00cfac;
}
.questionList{
    padding: 20px 0;
    height: calc(100vh - 44px);
    overflow-y: scroll;
    background: #fff;
}
[v-cloak] {
  display: none;
}
.queryQuestion{
    padding: 10px 26px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.queryQuestion:active{
    background: #e8e8e8;
    color:#00cfac;
}
</style>
