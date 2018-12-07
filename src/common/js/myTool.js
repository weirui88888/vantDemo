/*
 * @Author: rui.wei 
 * @Date: 2018-12-03 11:41:45 
 * @Last Modified by: rui.wei
 * @Last Modified time: 2018-12-03 11:44:19
 */

export default {

    // 截取url参数
    getQueryString:(name)=>{ 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
    },

    // 设置sessionStorage
    setSession:function(key,value){
        window.sessionStorage.setItem(key, value);
    },

    // 获取设置sessionStorage
    getSession:function(key){
        return sessionStorage.getItem(key);
    },

    // 删除sessionStorage
    removeSession:function(key){
        sessionStorage.removeItem(key); 
    },


}