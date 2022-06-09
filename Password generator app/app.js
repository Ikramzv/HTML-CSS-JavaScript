const generatorEl = document.getElementById('generator')
const titleInputEl = document.querySelector('.title input')
const lengthEl = document.getElementById('length') 
const upperEl = document.getElementById('upper')
const lowerEl = document.getElementById('lower')
const numberEl = document.getElementById('number')
const symbolEl = document.getElementById('symbol')
const copyEl = document.getElementById('copy')

const upperLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'
const lowerLetters = 'qwertyuiopasdfghjklzxcvbnm'
const numbers = '1234567890'
const symbols = '!@#$&/+()=%^*'

generatorEl.addEventListener('click' , generatePassword , false)

function generate(unit) {
    return unit[Math.floor(Math.random() * unit.length)]
}


function generatePassword() {
    let length = lengthEl.value

    let password = ''

    if(upperEl.checked) {
        password += generate(upperLetters)
    }
    if(lowerEl.checked) {
        password += generate(lowerLetters)
    }
    if(numberEl.checked) {
        password += generate(numbers)
    }
    if(symbolEl.checked) {
        password += generate(symbols)
    }

    
    for(let i = password.length;i < length;i++) {
        const x = getResult()
        password += x
    }
    
    if(length < parseInt(lengthEl.min)) {
        password = ''
        return alert('Minimum value is ' + lengthEl.min)
    }

    if(length > parseInt(lengthEl.max)) {
        password = ''
        return alert('Maximum value is ' + lengthEl.max)
    }

    titleInputEl.value = password
    
}

function getResult() {
    let xs = []

    if(upperEl.checked) {
        xs.push(generate(upperLetters))
    }
    if(lowerEl.checked) {
        xs.push(generate(lowerLetters))
    }
    if(numberEl.checked) {
        xs.push(generate(numbers))
    }
    if(symbolEl.checked) {
        xs.push(generate(symbols))
    }
    
    if(xs.length == 0) return ''
    
    return xs[Math.floor(Math.random() * xs.length)]

}


copyEl.addEventListener('click' , ()=>{
    const textarea = document.createElement('textarea')

    textarea.innerText = titleInputEl.value

    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    alert('Clipboard is copied')
    textarea.remove()
})