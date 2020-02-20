import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import appStore, { clearAppStore, setAppStore } from '../appStore'

let HOST_URL = ''
let OTHER_HOST_URL = ''

HOST_URL = process.env.VUE_APP_URL
OTHER_HOST_URL = process.env.VUE_APP_OTHER_URL
// HOST_URL = 'http://172.27.9.203:8280';

export const urlInfo = { HOST_URL, OTHER_HOST_URL }

// axios.defaults.withCredentials = true;
const http = axios.create({
  baseURL: HOST_URL,
  withCredentials: true
})

http.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    const authorization = appStore.authInfo.authorization

    if (authorization) {
      config.headers.common['authorization'] = authorization
    } else {
      const url = document.location.href.split('?')[1]
      // 待设计
      const urlParams = qs.parse(url)
      if (urlParams.ticket) {
        config.headers.common['ticket'] = urlParams.ticket
      }
    }
    return config
  },
  err => Promise.reject(err)
)
http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// http响应拦截器
http.interceptors.response.use(
  data => {
    if (data.headers.authorization && !appStore.authInfo.authorization) {
      const { authorization } = data.headers
      let { ...authInfo } = appStore.authInfo
      authInfo.authorization = authorization
      window.localStorage.setItem('authorization', authorization)
      setAppStore({ authInfo })
    }

    if (data.status == 200) {
      switch (data.data.code) {
        case 200:
          return Promise.resolve(data.data)
        case 302:
          clearAppStore()
          localStorage.clear()
          if (data.request.responseURL.includes('/logout')) {
            window.location = `${data.data.content.redirectUrl}`
          } else {
            let url = window.location.href.split('?')[0]
            url = encodeURIComponent(url)
            window.location = `${data.data.content.redirectUrl}?redirectUrl=${url}`
          }
          return Promise.reject(data)
        case 500:
          Message({
            showClose: true,
            duration: 2000,
            message: data.data.msg ? data.data.msg : '接口报错！',
            type: 'error'
          })
          //   Message.error(data.data.msg ? data.data.msg : '接口报错！');
          return Promise.reject(data)
        default:
          return Promise.reject(data)
      }
    }
  },
  error => {
    localStorage.clear()
    Message({
      showClose: true,
      duration: 2000,
      message: error.response.data.message
        ? error.response.data.message
        : '错误',
      type: 'error'
    })

    return Promise.reject(error.response)
  }
)

export function paresJsonToForm(params) {
  const formModel = new FormData()
  Object.keys(params).forEach(key => {
    formModel.append(key, params[key])
  })
  return formModel
}

export default http



