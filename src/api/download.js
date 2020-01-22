import { systemUrl } from './http'
// 普通下载
export function downLoad(url) {
  if (url[0] != 'h') {
    url = systemUrl.HOST_URL + url
  }
  window.open(url)
}
// form下载
export function downLoadFileByForm({ data = {}, url, ajaxMethod = 'POST' }) {
  let action = systemUrl.HOST_URL + url
  const tempForm = document.createElement('form')
  tempForm.id = 'postDataForm'
  tempForm.name = 'postDataForm'
  // 添加到 body 中
  document.body.appendChild(tempForm)

  Object.keys(data).forEach(key => {
    // 设置相应参数
    let formItem = document.createElement('input')
    formItem.type = 'text'
    formItem.name = key
    formItem.value =
      typeof data[key] != 'object' ? data[key] : JSON.stringify(data[key])
    // 将该输入框插入到 form 中
    tempForm.appendChild(formItem)
  })
  // form 的提交方式
  tempForm.method = ajaxMethod
  // form 提交路径
  tempForm.action = action

  // 对该 form 执行提交
  tempForm.submit()
  // 删除该 form
  document.body.removeChild(tempForm)
}
// http下载
export function downLoadByAjax({ data = {}, url, ajaxMethod = 'POST' }) {
  let action = systemUrl.HOST_URL + url
  const tempForm = document.createElement('form')
  tempForm.id = 'postDataForm'
  tempForm.name = 'postDataForm'
  // 添加到 body 中
  document.body.appendChild(tempForm)

  Object.keys(data).forEach(key => {
    // 设置相应参数
    let formItem = document.createElement('input')
    formItem.type = 'text'
    formItem.name = key
    formItem.value =
      typeof data[key] != 'object' ? data[key] : JSON.stringify(data[key])
    // 将该输入框插入到 form 中
    tempForm.appendChild(formItem)
  })
  // form 的提交方式
  tempForm.method = ajaxMethod
  // form 提交路径
  tempForm.action = action

  // 对该 form 执行提交
  tempForm.submit()
  // 删除该 form
  document.body.removeChild(tempForm)
}
