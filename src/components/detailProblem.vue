<template>
  <div id="detailPage" v-cloak>
    <main>
      <h4 class="title">Q:{{detailInfo.problem}}</h4>
      <h4 class="title">A:</h4>

      <ul class="detailContainer">
        <li class="detailList" v-for="item in detailInfo.answer">{{item}}</li>
      </ul>

      <section class="praiseArea clearfloat">
        <section class="praise good" @click.once="praiseGood" v-if="showGood">有用
          <van-icon name="good"/>
        </section>
        <section class="praise good praiseActive" v-else>有用
          <van-icon name="goodActive"/>
        </section>
        <section class="praise bad" @click.once="praiseBad" v-if="showBad">
          <van-icon name="bad"/>没用
        </section>
        <section class="praise bad praiseActive" v-else>
          <van-icon name="badActive"/>没用
        </section>
      </section>
    </main>

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
import { Icon ,Popup , Picker , NavBar ,Actionsheet} from "vant";
import request from '@/common/js/request';



export default {
  name: "detailProblem",
  data: function() {
    return {
      telephones:[
          '<a href="https://github.com/weirui88888" class="link">个人github传送门</a>',
          '<a href="mailto:weirui88888@163.com" class="link">个人邮箱:weirui88888@163.com</a>',
      ],
      title: "详情页面",
      showTelephone: false,
      getDetailUrl: "./getbyid", //根据id查询详情问题
      detailInfo: {},
      showGood: true,
      showBad: true,
      clickTime: false,
      showAppreciate:false,
      
    };
  },
  methods: {
    praiseGood: function() {
      if (this.clickTime) {
        return;
      }
      this.clickTime = true;
      this.showGood = !this.showGood;
    },
    praiseBad: function() {
      if (this.clickTime) {
        return;
      }
      this.clickTime = true;
      this.showBad = !this.showBad;
    },
    onCancel: function() {
      this.showTelephone = false;
    },
    goToAppreciate:function(){
        this.showAppreciate = true;
    },
    onClickLeft:function(){
        this.showAppreciate = false;
    }
    
    
  },
  mounted: function() {
            // 这里不知道为啥通过this.$myTool.getQueryString("id")拿不到id
        var id = this.$route.query.id;
        request({
            url:this.getDetailUrl,
            methods:"get",
            params: {
              id: id
            },
        })
        .then(response => {
            if(response.data.code == "success"){
                    this.detailInfo = response.data.data[0];
                    this.detailInfo.answer = this.detailInfo.answer.split("\n");
            }
        })
        .catch(() => {
            // 可以写个404页面，当查询报错时，统一跳转到404页面
        });

  },
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [NavBar.name]: NavBar,
    [Actionsheet.name]:Actionsheet
  }
};
</script>

<style scoped>

#detailPage{
    background: #fff;
    height: 100%;
    font-size: 14px;
}

[v-cloak] {
    display: none;
}
.clearfloat::after{
    content: "";
    display: block;
    clear: both;
}
.title{
    font-size: 18px;
    padding: 5px 0;
}

.detailList{
    font-size: 15px;
    line-height: 25px;
}


main{
    height: calc(100vh - 50px);
    overflow-y: scroll;
    padding: 45px 40px;
}

.praiseArea{
    padding: 0 30px;
    margin-top: 50px;
}

.praise{
    width: 45%;
    border: 1px solid #e1e1e1;
    height: 40px;
    padding: 0 10px;
    font-size: 13px;
    text-align: center;
    line-height: 40px;
}
.praiseActive{
    color: #00e0ae;
}

.praise .van-icon{
    color: black;
}
.good{
    float: left;
}
.bad{
    float: right;
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
