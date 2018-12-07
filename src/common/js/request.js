import axios from 'axios'


// 创建axios实例
const service = axios.create({
    baseURL: "http://localhost:8080/api/json", // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// 里面可以加上axios里面的拦截器，本需求没有必要，就没加上，可自行根据项目选择

export default service