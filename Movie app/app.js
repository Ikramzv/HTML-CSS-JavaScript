const API_KEY = '30da06509da7844490dcbe192ccf4665'
const BY_POPULARITY_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=${API_KEY}`
const BY_SEARCH_URL =  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&`

const containerEl = document.getElementById('container')
const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const searchEl = document.getElementById('search')
const formEl = document.getElementById('form')
const headerEl = document.getElementById('header')

// Get movies sort by popularity

getMovie(`${BY_POPULARITY_URL}`)

// Get movies what you want when you submit the input 

formEl.addEventListener('submit' , (e)=>{
    e.preventDefault()
    if(searchEl.value.length > 0) {
        containerEl.innerHTML = ''
        getMovie(`${BY_SEARCH_URL}query=${searchEl.value}`)
        searchEl.value = ''
    }else {
        containerEl.innerHTML = ''
        return getMovie(`${BY_POPULARITY_URL}`)
    }
})

// Provide the url and get the movies

async function getMovie(url) {
    let movies = await fetch(`${url}`).then(res => {
        return res.json()
    }).then(data => {
        console.log(data);
        return data
    })
    
    return showMovies(movies)
}

// Show movies function

function showMovies(data) {
    data.results.forEach(movie => {
        const mainEl = document.createElement('main')
        mainEl.id = movie.id
        mainEl.innerHTML = `
                <div class="header">
                    <img src="${IMGPATH}${movie.poster_path ? movie.poster_path : movie.backdrop_path}" alt="${movie.title}">
                </div>
                <div class="footer">
                    <h3 id="movie-title">${movie.title}</h3>
                </div>
                <div class="over-view">
                    ${movie.overview}
                    <div class="popularity">Popularity: ${movie.popularity}</div>
                </div>
                <span id="vote" class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
        ` 

        containerEl.appendChild(mainEl)
        
        if(mainEl.querySelector('img').src === 'https://image.tmdb.org/t/p/w1280null') {
            mainEl.remove()
        }

        
        if(mainEl.offsetTop + mainEl.offsetHeight - headerEl.offsetHeight - containerEl.offsetTop > window.outerHeight) {
            mainEl.style.opacity = 0
            mainEl.style.transform = `scale(0)`
            window.addEventListener('scroll' , ()=>{
                if(mainEl.offsetTop + mainEl.offsetHeight - headerEl.offsetHeight - containerEl.offsetTop < window.outerHeight + window.scrollY) {
                    mainEl.style.opacity = 1
                    mainEl.style.transform = `scale(1)`
                }else {
                    mainEl.style.opacity = 0
                    mainEl.style.transform = `scale(0)`
                }
            })
        }

    })    
    
}

// Get movie that sorted by movie ID

async function getMovieByID(id) {
    const movies = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then(res => {
        return res.json()
    }).then(data => {
        console.log(data);
    })

    return movies
} 

// Define the vote's color according to its range

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    }else if(vote >= 6) {
        return 'blue'
    }else {
        return 'red'
    }
}