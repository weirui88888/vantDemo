<template>
  <div>
        <header>
            <van-search class="searchInput" placeholder="搜索问题" background="#fff" readonly @click="toSearch"/>
        </header>

        <main class="clearfloat">
                <div class="mainQuestion" v-for="item in orderOftenQuestions" @click="toSecond(item.model,item.firsttype)">
                        <van-icon :name="item.iconName" />
                        <p class="mainQuestion-title">{{item.model}}</p>
                </div>
        </main>

        <section class="hot-question">
            <h4 class="hot-question-title">热门问题</h4>
			
			<div class="wrapper" ref="scroll">
				<div class="hot-question-list content">
					<van-cell
						class="hot-question-todetail"
					  	clickable
					    v-for="(question, index) in hotQuestions"
					    :key="question.id"
					    :border="false"
					    :title="question.problem"
					    @click="goDetail(question.id)"
					  />	
            		</div>
			</div>
        </section>
        
    <footer>
        <div class="telephone contact" @click="showTelephone=true">联系我吧</div>
        <div class="online contact" @click="goToAppreciate">赞赏我吧</div>
    </footer>
    
    <van-actionsheet v-model="showTelephone" title="来了老弟">
        <ul class="contactUl">
            <li v-for="item in telephones" v-html="item"></li>
        </ul>
	</van-actionsheet>

    <van-popup v-model="showAppreciate" position="right" >
        <van-nav-bar
        title="来啦，老弟"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <p class="myheart">天将降大任于斯人也</p>
        <p class="myheart">必先苦其心志，劳其筋骨，饿其体肤，空乏其身</p>
        <p class="myheart">原创不易，且行且珍惜</p>
        <p class="myheart">我坚信，赞赏是不耍流氓的<span class="guli">鼓励</span></p>
        <p class="myheart">谢谢!</p>
        <img src="../assets/appreciate.png" alt="" class="showAppreciateImg">
    </van-popup>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import request from '@/common/js/request'
import { Button, Dialog, Icon ,List,Cell,CellGroup,Popup,Field,Search,Picker,NavBar , Actionsheet} from "vant";
export default {
  name: "commonProblem",
  data: function() {
    return {
        	telephones:[
                '<a href="https://github.com/weirui88888" class="link">个人github传送门</a>',
                '<a href="mailto:weirui88888@163.com" class="link">个人邮箱:weirui88888@163.com</a>'
            ],
            showTelephone:false,
            showAppreciate:false,//赞赏popup
            title:"常见问题",
            getModelUrl:"./getModels",//查询6大模块地址,get
            oftenQuestions:[],
            getHotProblemUrl:"./getHotProblem",//查询热门问题,get
            toSecondUrl:"./type",//跳转至二级页面
            hotQuestions:[]
    }
  },
  methods: {
    	//查询常见问题
        getModels:function(){
            request({
                url:this.getModelUrl,
                methods:"get",
            })
            .then(response => {
                if(response.data.code == "success"){
                    this.oftenQuestions = response.data.data;
                }
            })
            .catch(() => {
                // 可以写个404页面，当查询报错时，统一跳转到404页面
                this.oftenQuestions = [];
            });
        },

        //查询热门问题
        getHotProblem:function(){
            request({
                url:this.getHotProblemUrl,
                methods:"get",
            })
            .then(response => {
                if(response.data.code == "success"){
                    this.hotQuestions = response.data.data;
                    this.$nextTick(() => {
        				let scrollBox = this.$refs.scroll;
        				this.scroll = new BScroll(scrollBox,{
        					probeType: 3,
        					click: true,//不添加这个属性 原生的click事件没有效果
        					scrollbar : false,//表示滚动的时候 是否需要滚动条
        					scrollfree : true,
        					bounce:true,//到底或者到顶部 是否有动画效果
        				});
        			});
                }
            })
            .catch(() => {
                // 可以写个404页面，当查询报错时，统一跳转到404页面
                this.hotQuestions = [];
            });
        },

        //跳转至搜索页面
        toSearch:function(){
            this.$myTool.removeSession("searchkey");
            this.$router.push({ name: 'searchPage'})
        },

        //点击热门问题，跳转至详情页面
        goDetail:function(id){
            this.$router.push({ path: 'detail', query: { id: id }})
        },

        //跳转至二级页面
        toSecond:function(model,type){
            // var url = `${this.toSecondUrl}?model=${model}&type=${type}`;
            this.$myTool.removeSession("typeIndex");
            this.$router.push({path:this.toSecondUrl,query:{model:model,type:type}})
        },
        onCancel:function(){
            this.showTelephone = false;
        },
        goToAppreciate:function(){
        	this.showAppreciate = true;
        },
        onClickLeft:function(){
            this.showAppreciate = false;
        }
  },
  computed:{
    		orderOftenQuestions:function(){
    			 return _.orderBy(this.oftenQuestions, 'sortnum')
    		}
    },
    mounted:function(){
            this.getModels()
            this.getHotProblem()
    },
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [List.name]:List,
    [Cell.name]:Cell,
    [CellGroup.name]:CellGroup,
    [Popup.name]:Popup,
    [Field.name]:Field,
    [Icon.name]: Icon,
    [Search.name]:Search,
    [Picker.name]:Picker,
    [NavBar.name]:NavBar,
    [Actionsheet.name]:Actionsheet,
  }
};
</script>

<style scoped>

.clearfloat::after{
    content: "";
    display: block;
    clear: both;
}


[v-cloak] {
  display: none;
}


header{
    padding: 14px 0;
}
.searchInput .van-field:active{
	background:rgba(221,221,221,0.1)
}

main{
    background: #fff;
    padding: 20px 30px;
}

.mainQuestion{
    width: 25%;
    float: left;
    text-align: center;
    padding: 10px 0;
}
.mainQuestion:active{
    background: rgba(200, 200, 200, 0.4)
}

.mainQuestion-title{
    color: #666666;
    padding: 10px 0;
    font-size: 12px;
}

/* .hot-question{
    padding: 0 26px;
} */

.hot-question-title{
    font-weight: normal;
    padding: 7px 26px;
    color: #b6b5ba;
}
.wrapper{
    background: #fff;
    height: calc(100vh - 72px - 214px - 40px - 44px);
    overflow-y: hidden;
}

.hot-question-todetail{
    padding: 10px 26px;
    font-size: 14px;
    color: #666666;
}

.hot-question-todetail:active{
    color:#00cfac;
}
footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}
.contact{
    float: left;
    width: 50%;
    height: 50px;
    text-align: center;
    line-height: 50px;
}
.telephone{
    background: #c3fbd8;
    color: #2ddaad;
}
.online{
    background: #00e0ae;
    color: #fff;
}
.van-popup--right{
    width: 100%;
    height: 100%;
    text-align: center;
}
.myheart{
    padding: 5px 0;
    font-size: 15px;
    font-style: italic;
}
.myheart:nth-of-type(1){
    margin-top: 20px;
} 
.showAppreciateImg{
    margin-top: 20px;
    width: 80%;
}
.guli{
    font-weight: bold;
    color: #00cfac;
    font-size: 18px;
}




</style>
