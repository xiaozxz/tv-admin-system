const defaultData = []
function initData() {
  let i = 20
  while (i > 0) {
    let data = {
      id: i,
      title: '标题' + i,
      time: '2019-01-0' + i,
      status: 0
    }
    defaultData.push(data)
    i--
  }
}

initData()

export function getTestData(params) {
  let number = params['page.pn'] - 1
  let size = params['page.size']
  let content = defaultData.slice(number * size, params['page.pn'] * size)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        content: {
          content,
          number,
          size,
          totalElements: defaultData.length
        }
      })
    }, 2000)
  })
}

export function ajaxService() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        content: true
      })
    }, 2000)
  })
}
