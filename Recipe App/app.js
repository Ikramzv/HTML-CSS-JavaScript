const debuggerr = document.getElementById('debugger')
const searchEl = document.getElementById('search')
const rightSec = document.querySelector('.container .right')
const favMeals = document.getElementById('fav-meals')
const searchBtn = document.getElementById('search-btn')
const closeInfoBtn = document.getElementById('close-info')
const mealInfoEl = document.getElementById('meal-info')

const randomMealContainer = document.getElementById('meals')



getRandomMeal()
fetchFavMealsLocalStorageAndShow()


// Styles

searchEl.addEventListener('focusin' , ()=>{
    document.querySelector('header .left').style.flex = "none" 
    document.querySelector('header .center').style.flex = "1 1 40%" 
    rightSec.style.flex = "1 1 100%"
    searchEl.style.width = "100%"
})

searchEl.addEventListener('focusout' , ()=>{
    document.querySelector('header .left').style.flex = "1 1 20%" 
    document.querySelector('header .center').style.flex = "1 1 60%" 
    rightSec.style.flex = "1 1 20%"
    searchEl.style.width = "10rem"
})


debuggerr.addEventListener("click" , ()=>{
    hamburger.classList.toggle('open')
})
document.querySelector('.container .right .fa-solid').addEventListener('click' , ()=>{
    getMealBySearch(searchEl.value)
})

// =========


function showMealsOnTheScreen(mealData) {
    let div = document.createElement('div')
    

    
    div.innerHTML = `
            <ul>
                <li>
                    <img src="${mealData.strMealThumb}" id="${mealData.idMeal}" alt="${mealData.strMeal}" >
                    <button class="info-btn" data-info="Please click">${mealData.strMeal}</button>
                    <button class="btn-close">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </li>
            </ul>
    `

    div.querySelector('.btn-close').addEventListener('click' , ()=>{
        div.remove()
        removeMealLocalStorage(mealData.idMeal)
        const btn = document.querySelector('.meal-body .btn')
        if(getMealsLocalStorage().filter(meal => meal == mealData.idMeal).length == 0 && mealData.idMeal == randomMealContainer.querySelector('.meal-header img').id) {
            btn.classList.remove('act')
        }else if(mealData.idMeal == randomMealContainer.querySelector('.meal-header img').id){
            btn.classList.add('act')
        }
    })

    div.querySelector('ul li .info-btn').addEventListener('click' , ()=>{
        showMealInfo(mealData)
        document.getElementById('meal-info').classList.toggle('hiddenTransition');
    })
    
    favMeals.appendChild(div)
}




function deleteMealOnTheScreen(mealId) {

    const div = document.getElementById(mealId)    
    div.remove()

}


async function getRandomMeal() {
    const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => {
        return res.json()
    }).then(data => {
        return data.meals[0]
    })

    console.log(randomMeal)
   
    addRandomMealToScreen(randomMeal)
}


async function getMealById(id) {
    const searchedById = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res)=>{
        return res.json()
    }).then(data=>{
        return data.meals[0]
    })
    console.log(searchedById)

    return searchedById

}

async function getMealBySearch(term) {
    const searchedMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data.meals;
    })

    console.log(searchedMeal);

    return searchedMeal 

}


searchBtn.addEventListener('click' , async ()=>{
    document.getElementById('meals').innerHTML = ""
    let meals = await getMealBySearch(searchEl.value)
    if(meals) {
        meals.forEach(meal => {
            addRandomMealToScreen(meal)
        });
    }else {
        console.error('Please provide another meal name because meal name you wrote did not found')
    }
})


function showMealInfo(mealData) {
    let mealDataContentEl = document.createElement('div')
    let mealDataHeaderEl = document.createElement('div')

    mealDataHeaderEl.innerHTML = `
    <div class="meal-info-header">
        <div class="header-fixed">
            <h1>Meal title</h1>
            <button class="close" id="close-info"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    `
    
    let ingredients = []

    for(let i = 1 ; i <= 20;i++) {
        if(mealData[`${'strIngredient' + i}`]) {
            ingredients.push(`${mealData['strIngredient' + i]} - ${mealData[`strMeasure` + i]}`)
        }
    }

    console.log(ingredients)
    

    mealDataContentEl.classList.toggle('meal-info-content')
    mealDataContentEl.innerHTML = `
                    <p class="list-info-title">${mealData.strInstructions}</p>
                    <ul>
                        ${ingredients.map(ing => `<li class="list-info-item">${ing}</li>`).join('')}
                    </ul>
    `
    mealInfoEl.appendChild(mealDataHeaderEl)
    mealInfoEl.appendChild(mealDataContentEl)
    mealDataHeaderEl.querySelector('.close').addEventListener('click' , ()=>{
        document.getElementById('meal-info-container').classList.add('hidden');
        document.getElementById('meal-info').classList.remove('hiddenTransition');
        mealDataHeaderEl.remove()
        mealDataContentEl.remove()
    })
    document.getElementById('meal-info-container').classList.remove('hidden');
}




function addRandomMealToScreen(mealData) {
    const meal = document.createElement('div')
    meal.classList.add('meal')
    meal.innerHTML = `
        <span class="random">Random Recipe</span>
        <div class="meal">
            <div class="meal-header">
                <img src="${mealData.strMealThumb}" alt="${mealData.strCategory}" id="${mealData.idMeal}">
            </div>
            <div class="meal-body">
                <h4 id="${mealData.idMeal}">${mealData.strMeal}</h4>
                <button type="button" class="btn" id="${mealData.idMeal}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `

    meal.querySelector('.meal-body .btn').addEventListener('click' , () => {
        
        let includes = getMealsLocalStorage().some(meal => meal == mealData.idMeal)
        
        if(!meal.querySelector('.meal-body .btn').classList.contains('act')){
            if(!includes) {
                meal.querySelector('.meal-body .btn').classList.add('act')
                addMealLocalStorage(mealData.idMeal)
                favMeals.innerHTML = ""
                fetchFavMealsLocalStorageAndShow()
            }
        }else {
            meal.querySelector('.meal-body .btn').classList.remove('act')
            favMeals.innerHTML = ""
            removeMealLocalStorage(mealData.idMeal)
            fetchFavMealsLocalStorageAndShow()
        }
    })    

    randomMealContainer.appendChild(meal)
}   





// Add , remove , get Local Storage 

function removeMealLocalStorage(meal) {
    const getMeals = getMealsLocalStorage()
    return localStorage.setItem('favMealsIDs' , JSON.stringify(getMeals.filter(mealId => mealId !== meal)))
}

function addMealLocalStorage(meal) {
    return localStorage.setItem('favMealsIDs' , JSON.stringify([...getMealsLocalStorage() , meal]))
}

function getMealsLocalStorage() {
    return JSON.parse(localStorage.getItem('favMealsIDs')) === null ? [] : JSON.parse(localStorage.getItem('favMealsIDs'))
}

// ==============



async function fetchFavMealsLocalStorageAndShow() {
    let getMeals = getMealsLocalStorage()
    for(let mealId of getMeals) {
        let meal = await getMealById(mealId)
        showMealsOnTheScreen(meal)
    }
}


