NodeList.prototype.__proto__ = Array.prototype

import jsonp from 'jsonp-es6'

const form = document.querySelector('form')
const message = document.querySelector('.js-message')

form.onsubmit = function (event) {
  let url = form.action
  let params = {}

  let inputs = form.querySelectorAll('input')

  inputs.forEach((i) => {
    params[i.name] = i.value
  })

  jsonp(url, params)
    .then((r) => {
      if (r.Status === 200) {
        message.textContent = 'Subscribed!'
      }
    })

  event.preventDefault()
}
