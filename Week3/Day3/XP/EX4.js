const form = document.getElementById('MyForm');
let radius = document.getElementById('radius')
let result = document.getElementById('volume')
let btn = document.getElementById('submit')




form.addEventListener('submit', (e) => {
    e.preventDefault()
    let radiusV = radius.value
    let calculate = (1/4 * Math.PI * Math.pow(radiusV, 2)).toFixed(2)
    result.value = calculate
})