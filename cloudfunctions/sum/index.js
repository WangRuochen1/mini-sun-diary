// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  //const wxContext = cloud.getWXContext()

  console.log("event a:",event.a)
  console.log("event b:",event.b)
  console.log("event a + b:",event.a + event.b)

  return {
   sum: event.a + event.b,
  }
}