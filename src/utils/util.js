import ajax from './ajax'
import apis from './apis'

export default {
  dateFormat (date) {
    let dateArray = []
    dateArray.push(date.getFullYear())
    dateArray.push(date.getMonth() + 1)
    dateArray.push(date.getDate())
    return dateArray.join('-')
  },

  // 表单数据格式化
  registerDataFormat (data) {
    return data.map(item => {
      let formItem = {
        placeholder: item.name,
        options: item.extra,
        value: ''
      }
      switch (Number(item.type)) {
        case 1:
          formItem.type = 'telephone'
          break
        case 2:
          formItem.type = 'email'
          break
        case 3:
          formItem.type = 'number'
          break
        case 4:
          formItem.type = 'text'
          break
        case 5:
          formItem.type = 'select'
          formItem.value = 'unselectedOption'
          break
      }
      return formItem
    })
  },

  // 表单设计数据序列化
  registerDataStringify (data) {
    const form = data.map(item => {
      let formItem = { name: item.placeholder }
      if (item.options) formItem.extra = item.options
      switch (item.type) {
        case 'telephone':
          formItem.type = 1
          break
        case 'email':
          formItem.type = 2
          break
        case 'number':
          formItem.type = 3
          break
        case 'text':
          formItem.type = 4
          break
        case 'select':
          formItem.type = 5
          break
      }
      return formItem
    })
    return JSON.stringify(form)
  },

  // 报名表单数据序列化 code-验证码
  registerClockDataStringify (data, code) {
    const form = data.map(item => {
      let formItem = {
        name: item.placeholder,
        value: item.value
      }
      switch (item.type) {
        case 'telephone':
          formItem.type = 1
          formItem.code = code
          break
        case 'email':
          formItem.type = 2
          break
        case 'number':
          formItem.type = 3
          break
        case 'text':
          formItem.type = 4
          break
        case 'select':
          formItem.type = 5
          break
      }
      return formItem
    })
    return JSON.stringify(form)
  },

  getServerTime () {
    return new Promise((resolve, reject) => {
      ajax.auto(apis.tool.getTime)
          .then(res => {
            resolve && resolve(res.data.today)
          })
    })
  },

  renderStyle ($el) {
    function render (prop, value) {
      $el.style[prop] = value
      return render
    }
    return render
  },

  triggerListener ($el) {
    function trigger (type, events, fns) {
      if (type === 'add') {
        events.forEach((event, index) => {
          $el.addEventListener(event, fns[index])
        })
      }
      else {
        events.forEach((event, index) => {
          $el.removeEventListener(event, fns[index])
        })
      }
      return trigger
    }
    return trigger
  }
}