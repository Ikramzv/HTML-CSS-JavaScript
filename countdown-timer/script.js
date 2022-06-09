const days = document.getElementById('day-span')
const hours = document.getElementById('hour-span')
const minutes = document.getElementById('minute-span')
const seconds = document.getElementById('second-span')

function countdown() {
    const newYearsDate = new Date('1 , Jan , 2023')
    const currentDate = new Date()
    
    let second = Math.floor((newYearsDate - currentDate) / 1000)
    let minute = Math.floor((second / 60) % 60)
    let hour = Math.floor(second / 3600) % 24
    let day = Math.floor(second / 3600 / 24)

    days.innerHTML = day
    hours.textContent = format(hour)
    minutes.textContent = format(minute)
    seconds.textContent = format(second % 60)
    
}


function format(time) {
    return time < 10 ? `0${time}` : time
}


countdown()
setInterval(countdown , 1000);