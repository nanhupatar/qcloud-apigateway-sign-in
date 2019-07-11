const {get,post} = require('./httpClient');

get('/qcloud_gateway')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })