NodeList.prototype.__proto__ = Array.prototype

const svgEl = document.querySelector('#graph-anim')
let xPos = 0

for (let i = 0; i < 75; i++) {
  svgEl.querySelector('g').innerHTML += `<g transform="translate(${xPos}, 0)">
    <rect width="20" height="100%" />
  </g>`

  xPos = xPos + 25
}

svgEl.querySelectorAll('rect').forEach((rect) => {
  const startScale = `scaleY(${Math.random(1.0).toFixed(2)})`
  const endScale = `scaleY(${Math.random(1.0).toFixed(2)})`

  rect.animate([
    { transform: startScale },
    { transform: startScale },
    { transform: endScale, offset: 0.9 },
    { transform: endScale }
  ], {
    direction: 'alternate',
    duration: 2500,
    iterations: Infinity,
    easing: 'ease-in-out'
  })
})
