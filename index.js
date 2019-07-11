const axios = require('./http');

// get请求
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// post请求
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export {get,post}