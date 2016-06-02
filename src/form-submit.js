NodeList.prototype.__proto__ = Array.prototype

import jsonp from 'jsonp-es6'

const form = document.querySelector('form')
const message = document.querySelector('.js-message')

form.onsubmit = function (event) {
  let url = form.action
  let params = {}

  let inputs = form.querySelectorAll('input')
  let button = form.querySelector('button')

  inputs.forEach((i) => {
    params[i.name] = i.value
  })

  jsonp(url, params)
    .then((r) => {
      if (r.Status === 200) {
        message.textContent = 'Subscribed!'
        button.textContent = '🔜💌'
      } else {
        message.textContent = r.Message
      }

      message.classList.remove('white-50')
      message.classList.add('white-90')
    })

  event.preventDefault()
}
