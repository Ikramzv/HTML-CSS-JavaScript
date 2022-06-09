const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const increase = document.getElementById('increase')
const decrease = document.getElementById('decrease')
const spanEl = document.getElementById('size')
const color = document.getElementById('color')

let size = 10;
let isPressed = false

spanEl.innerHTML = size

let x = undefined
let y = undefined





canvas.addEventListener('mousedown' , (e)=>{
    isPressed = true

    console.log(e);

    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup' , ()=>{
    isPressed = false

    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove' , (e)=> {
    if(isPressed) {
        const x1 = e.offsetX
        const y1 = e.offsetY
        
        drawCircle(x1 , y1)
        drawLine(x, y , x1 ,y1)
        
        x = x1
        y = y1
    }
})

function drawLine(x , y , x1 , y1) {
    ctx.beginPath()
    ctx.moveTo(x , y)
    ctx.lineTo(x1 , y1)
    ctx.lineWidth = size * 2
    ctx.stroke()
}

color.addEventListener('change' , () =>{
    ctx.fillStyle = color.value
    ctx.strokeStyle = color.value
}) 

function drawCircle(x , y) {
    ctx.beginPath()
    ctx.arc(x , y , size , 0 , 2 * Math.PI)
    ctx.fill();
}

increase.addEventListener('click' , ()=>{
    size++
    if(size > 50) {
        size = 50
    }

    spanEl.innerHTML = size

})

decrease.addEventListener('click' , ()=>{
    size--
    if(size < 1) {
        size = 1
    }

    spanEl.innerHTML = size

})

window.addEventListener('keydown' , (e)=>{
    if(e.key === 'Escape') {
        ctx.clearRect(0,0,canvas.width , canvas.height)
    }
})