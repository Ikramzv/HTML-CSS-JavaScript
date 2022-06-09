const form = document.getElementById('form')
const searchEl = document.getElementById('search')
const mainContainerEl = document.getElementById('main-container')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
		'X-RapidAPI-Key': 'e4fe5f33a3msha31904fb3c1d387p158fcbjsn3bef2434ae3a'
	}
};

if(mainContainerEl.childElementCount === 0) {
    mainContainerEl.style.display = 'none'
}

form.addEventListener('submit' , (e) => {
    e.preventDefault()
    
    if(searchEl.value) {
        getDataByLocation(searchEl.value)
    }
    searchEl.value = ''
})


async function getDataByLocation(location) {
    let get = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${location}`, options)
	.then(response => {
        return response.json()
    }).then(response => {
        console.log(response);
        return response
    })
    
    return addWheatherToPage(get)
}


function addWheatherToPage(data) {
    if(data.cod !== '404') {
        mainContainerEl.style.display = 'flex'
    }

    const temp = KtoC(data.main.temp)
    const main = document.createElement('main')
    main.innerHTML = `
        <i class="fa-solid fa-xmark" id="close"></i>
        <div id="image-container">
                    <img src="../images/stars.avif" alt="${data.name}" id="main-img">
                </div>
                <div class="title">
                    <h2>${data.name}</h2>
                    <div class="cont">
                        <strong>${temp} C<sup>o</sup></strong>
                        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].main}" id="icon_img" >
                    </div>
                    <strong>${data.weather[0].main}</strong>
        </div>
    `

    main.querySelector('i').addEventListener('click' , () => {
        main.remove()
        if(mainContainerEl.childElementCount == 0) {
            mainContainerEl.style.display = 'none'
        }
    })

    mainContainerEl.prepend(main)
}



function KtoC(k) {
    return Number(Math.floor((k - 273.15)))
}