const Fly = require("flyio/dist/npm/wx")
import APIS from "../apis"
const Request = new Fly()
const newRequest = new Fly()

// 配置请求根域名
// Request.config.baseURL = APIS.BASE_URL
// newRequest.config.baseURL = APIS.BASE_URL

//公共方法设置请求头
function configHeader (request) {
  const token = uni.getStorageSync('token')
  if (token) {
    request.headers['accessToken'] = token
  }
  return request
}
/*
1.有token 、有授权,正常设置请求头
2.没有token 、没有授权，锁住实例,跳转授权，再重新登录后，解锁实例
3.没有token 、有授权，锁住实例,静默登录后，解锁实例
4.无效token，移除token,回调2或3步骤
*/

// 配置请求拦截器
function requestConfig (request) {
  const token = uni.getStorageSync('token')
  let isAuthUserInfo = uni.getStorageSync('isAuthUserInfo')
  // if (token) {
  //   request.headers['accessToken'] = token
  // }
  // else if (!token) {
  //   Request.lock()
  //   return new Promise((resolve, reject) => {
  //     login(() => {
  //       resolve(configHeader(request))
  //     })
  //   }).finally(() => {
  //     Request.unlock()
  //   })
  // }
  return configHeader(request)
}

Request.interceptors.request.use(requestConfig)
newRequest.interceptors.request.use(configHeader)

//公共响应处理方法
function responseInterceptor (response) {

  const d = response.data
  console.log('d',d)
  if (d.code == 0) {
    return d
    // 未登录时，调用login流程登录后，再次调用业务接口
  } else {
    showErro(d.errMsg)
    return Promise.reject(d)
  }



}
//配置响应拦截器


Request.interceptors.response.use(responseInterceptor, err => showErro(err.response.data.message))
newRequest.interceptors.response.use(responseInterceptor, err => showErro(err.response.data.message))

//处理响应报错
function showErro (err) {
  uni.showToast({
    title: err.errMsg,
    icon: 'none'
  })
}

// 处理用户登录逻辑
function loginError (e) {
  console.log('e', e)
  uni.showToast({
    title: e.errMsg,
    icon: 'none'
  })

}

//wx.login
async function wxLogin () {
  return await new Promise((resolve, reject) => {
    uni.login({
      success (res) {
        if (res.code) {
          resolve(res.code)
        }
      },
      fail (rej) {
        reject(rej)
        loginError(rej)
      }
    })
  })
}

//内部接口登录
const doAppLogin = (data, cb) => {
  uni.showLoading({title:'登录中...'})
  newRequest.get(APIS.LOGIN+`?code=${data.code}`)
    .then(res => {
      console.log('登录返回',res)
      let d = res.data
      if(res && res.errCode == "00000000") {
        uni.setStorageSync('isVerify', true)
      }else if(d && d.errCode == "10060000") {
        uni.setStorageSync('isVerify', false)
      }
      if (d) {
        console.log('token', d)
        uni.setStorageSync('token', d.data||d)
        typeof cb == "function" && cb.call()
      } else {
        loginError()
      }
    })
	.finally(res => {
		uni.hideLoading()
	})
    .catch(rej => {
      loginError(rej)
    })
}


async function login (cb) {
  uni.showLoading({title:'登录中...'})
  try {
    let code = await wxLogin()
    console.log('code',code)
    
    doAppLogin({code}, cb)
  }
  catch (e) {
    loginError(e)
  }

}

export {
  Request,
  login
}