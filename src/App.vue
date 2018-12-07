<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
html,body{
    background: #f5f4f9;
    height: 100%;
    font-size: 14px;
}
.telephoneArea .van-picker a{
  color: #00cfac;
}
.telephoneArea .van-picker__confirm{
  color: #00cfac;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.van-nav-bar .van-icon{
  color: #00cfac;
}
.van-nav-bar__arrow+.van-nav-bar__text{
  color: #00cfac;
}
.contactUl{
	text-align:center;
	padding: 20px 0;
}
.contactUl li{
	padding:10px 0;
} 
.link{
  color: #20a0ff;
}
</style>
