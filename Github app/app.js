const USER_API_URL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const searchEl = document.getElementById('search')
const cardsEl = document.getElementById('cards')


form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    if(searchEl.value) {
        getUser(searchEl.value)
        getUserRepos(searchEl.value)
        searchEl.value = ''
    }else {
        return;
    }
})

async function getUserRepos(username) {
    const repos = await fetch(`${USER_API_URL}${username}/repos`).then(res => {
        return res.json()
    }).then(data => {
        return data
    })

    if(repos){
        return createRepo(repos)
    }else {
        return;
    }
}

function createRepo(repos) {
    repos.sort((a,b) => b.stargazers_count - a.stargazers_count).forEach(repo => {
        const li = document.createElement('li')
        const aTag = document.createElement('a')
    
        aTag.href = repo.html_url
        aTag.innerHTML = repo.name
        aTag.target = '_blank'
        
        li.appendChild(aTag)
        document.getElementById('repos-list').appendChild(li)

        if(li.offsetTop - cardsEl.offsetTop > cardsEl.clientHeight) {
            li.style.opacity = 0
            li.style.transform = 'scale(0)'
            cardsEl.addEventListener('scroll' , ()=>{
                if(li.offsetTop - cardsEl.offsetTop < cardsEl.offsetHeight + cardsEl.scrollTop) {
                    li.style.opacity = 1
                    li.style.transform = 'scale(1)'
                }else {
                    li.style.opacity = 0
                    li.style.transform = 'scale(0)'
                }
            })
        }
    })
}

async function getUser(username) {
    let userData = await fetch(`${USER_API_URL}${username}`).then(res => {
        return res.json()
    }).then(data => {
        return data
    })
    
    if(userData.message === 'Not Found') {
        searchEl.style.outline = '2px solid red'
        searchEl.placeholder = 'Please provide another username'
    }else {
        console.log(userData);
        searchEl.style.outline = 'none'
        searchEl.placeholder = 'Search user..'
        return createCardUser(userData)
    }
}

function createCardUser(user) {
    cardsEl.style.display = 'inherit'
    let cardHTML = `
    <div class="card">
    <div class="left-side">
    <img src="${user.avatar_url}" alt="${user.name}">
    </div>
    <div class="right-side">
    <h2>${user.name}</h2>
    <p>${user.bio === null ? '' : user.bio}</p>
    
    <ul>
        <li><i class="fa-solid fa-eye"></i> ${user.followers}</li>
        <li>
            <button id="heart" class="heart-btn">
                <i class="fa-solid fa-heart"></i>
            </button> <span>${user.following}</span>
        </li>
        <li><i class="fa-solid fa-layer-group"></i> ${user.public_repos}</li>
    </ul>
    </div>
    <div id="repos" class="repos" >
        <h2>${user.name}'s repositories</h2>
        <ul class="repos-list" id="repos-list">

        </ul>
    </div>
    </div>
    `

    cardsEl.innerHTML = cardHTML
    
        

    if(user.bio === null) {
        cardsEl.querySelector('.card .right-side').style.justifyContent = 'space-evenly'
    }

    
    cardsEl.querySelector('.card .right-side ul li .heart-btn').addEventListener('click' , ()=>{
        cardsEl.querySelector('.card .right-side ul li .heart-btn').classList.toggle('colored')
        if(cardsEl.querySelector('.card .right-side ul li .heart-btn').classList.contains('colored')) {
            user.following += 1
            cardsEl.querySelector('.card .right-side ul li span ').innerHTML = user.following
        }else {
            user.following -= 1
            cardsEl.querySelector('.card .right-side ul li span ').innerHTML = user.following
        }
    })
}