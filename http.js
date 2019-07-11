const  CryptoJS = require("crypto-js");
const axios = require('axios');
const config = require('./env/config')

// SCF环境的切换
if (config.env === 'release') {
  axios.defaults.baseURL = config.baseUrl + '/release'; //生产环境
} else if (config.env === 'prepub') {
  axios.defaults.baseURL = config.baseUrl + '/prepub'; //预发布环境
} else {
  axios.defaults.baseURL = config.baseUrl + '/test'; //测试环境
}

function getHeader() {
  const dateTime = new Date().toGMTString();
  const auth = 'hmac id="' + config.SecretId +'", algorithm="hmac-sha1", headers="x-date source", signature="';
  const signStr = "x-date: " + dateTime + "\n" + "source: " + config.source;
  let sign = CryptoJS.HmacSHA1(signStr, config.SecretKey);
  sign = CryptoJS.enc.Base64.stringify(sign);
  sign = auth + sign + '"';

  return {
    "Source": config.source,
    "X-Date": dateTime,
    "Authorization": sign
  }
}

const instance = axios.create({
  timeout: 5000,
  headers: getHeader(),
  withCredentials: true
})

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.reject(error);
  }
)

module.exports = instance;
