const defaultData = []
function initData() {
  let i = 20
  while (i > 0) {
    let data = {
      id: i,
      title: '标题' + i,
      subTitle: '小标题' + i,
      time: '2019-01-' + (i > 9 ? '' : '0') + i,
      status: 0
    }
    defaultData.push(data)
    i--
  }
}

initData()

export const list = defaultData

export function getTestData(params) {
  let number = params.page - 1
  let size = params.size
  let content = defaultData.slice(number * size, params['page'] * size)

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
    }, 100)
  })
}

export function getData(params) {
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
    }, 100)
  })
}

export function updateService(model) {
  return new Promise((resolve, reject) => {
    let index = defaultData.findIndex(item => item.id == model.id)
    if (index > -1) {
      let item = defaultData[index]
      for (var key in model) {
        item[key] = model[key]
      }
    } else {
      defaultData.unshift(defaultData)
    }
    setTimeout(() => {
      resolve({
        content: true
      })
    }, 2000)
  })
}

export function deleteService(model) {
  let index = defaultData.findIndex(item => item.id == model.id)
  if (index > -1) {
    defaultData.splice(index, 1)
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        content: true
      })
    }, 2000)
  })
}
