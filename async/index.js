// 异步 async await
// Promise 解决异步方案
// .then
// .then 
// .catch
// node file mysql 的读取都需要异步转同步
function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve(data)
      }, 500);
    } catch(e) {

    }
  })
}

async function getSyncData() {
  let time = await getSyncTime()
  let data = `endTime - startTime=${time}`
  return data
}
async function getData() {
  let data = await getSyncData()
  console.log(data)
  return data
}
getData()