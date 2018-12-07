<template>
  <div id="searchPage" v-cloak>
    <header>
      <form action="/">
        <van-search
          id="inputSearch"
          v-model="searchkey"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </header>

    <main class="wrapper" ref="scroll">
      <div class="noResult" v-if="showNoResult">
        <van-icon name="wjg"/>
        <p class="noResultMsg">亲～暂无查询结果</p>
      </div>
      <div class="content">
        <van-cell
          clickable
          v-for="item in searchList"
          :key="item.id"
          :title="item.problem"
          @click="toDetail(item.id)"
        />
      </div>
    </main>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import request from '@/common/js/request'
import { Icon, List, Cell, Search } from "vant";
export default {
  name: "searchProblem",
  data: function() {
    return {
      title: "搜索页面",
      searchkey: "",
      searchList: [],
      doSearchUrl: "./searchPro", //搜索url
      showNoResult: false
    };
  },
  methods: {

        onSearch:function(){
        		this.searchList = [];
            this.$myTool.setSession("searchkey",this.searchkey)
            
            request({
              url:this.doSearchUrl,
              methods:"get",
              params: {
                searchkey: this.searchkey
              },
            })
            .then(response => {
                if(response.data.code == "success"){
                    this.searchList = response.data.data;
                    if(this.searchList.length==0){
                      this.showNoResult = true;
                    }else{
                      this.showNoResult = false;
                    }
                    this.$nextTick(() => {
                        let scrollBox = this.$refs.scroll;
                        this.scroll = new BScroll(scrollBox,{
                          probeType: 3,
                          click: true,//不添加这个属性 原生的click事件没有效果
                          scrollbar : true,//表示滚动的时候 是否需要滚动条
                          scrollfree : true,
                          bounce:true,//到底或者到顶部 是否有动画效果
                        });
	        			    });
                }
            })
            .catch(() => {
                this.searchList = [];
                // 可以写个404页面，当查询报错时，统一跳转到404页面
            });
        },
        onCancel:function(){
            this.$router.push({ path: 'index'})
        },
        toDetail:function(id){
            this.$router.push({ path: 'detail', query: { id: id }})
        }
  },
  mounted: function() {
      var searchkey = this.$myTool.getSession("searchkey");
    		this.searchkey = searchkey;
    		if(this.searchkey){
    			this.onSearch(searchkey)
    		}
  },
  watch:{
    		//观测searchkey,当输入框清空时，删除查询结果
    		"searchkey":function(newvalue,oldvalue){
    			if(!newvalue){
    				this.searchList = [];
    			}
    		}
    },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Search.name]: Search,
  }
};
</script>

<style scoped>
#searchPage{
  background: #fff;
  height: 100%;
}

.van-search {
  padding: 12px 15px;
}

[v-cloak] {
  display: none;
}


.wrapper {
  padding: 0 0 20px 0;
  height: calc(100vh - 54px);
  overflow: hidden;
}

.searchList {
  padding: 10px 26px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.searchList:active {
  background: #e8e8e8;
  color: #00cfac;
}

.noResult {
  text-align: center;
  padding-top: 70px;
}
.noResultMsg {
  padding: 10px 0;
  color: #ccc;
}
</style>
