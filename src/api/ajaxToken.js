import axios from 'axios'

let ajaxSources = []

export function getSource(url) {
  var source = axios.CancelToken.source()
  ajaxSources.push(source)
  return source
  // source.cancel('')
}

export function clearSource() {
  ajaxSources.map(source => {
    source.cancel()
  })
  ajaxSources = []
}

export function delSource(token) {
  let index = ajaxSources.findIndex(source => source.token == token)
  if (index > -1) {
    ajaxSources.splice(index, 1)
  }
}

// axios
//   .get('/user/12345', {
//     cancelToken: source.token
//   })
//   .catch(function(thrown) {
//     if (axios.isCancel(thrown)) {
//       console.log('Request canceled', thrown.message)
//     } else {
//       // 处理错误
//     }
//   })
