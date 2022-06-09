const form = document.getElementById('form')
const input = document.getElementById('input')
const todos = document.getElementById('todos')


showFromLS()

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) === null ? [] : JSON.parse(localStorage.getItem('todos')) 
}

function showFromLS(){
    getTodosFromLocalStorage().forEach(todo => {
        let li = document.createElement('li')
        li.innerHTML = `
            <p>${todo}</p>  
        `

        li.addEventListener('dblclick' , ()=>{
            li.classList.toggle('completed')
            let completed = false
            if(li.classList.contains('completed')) {
                completed = true
            }else {
                completed = false
            }
        })
    
        li.addEventListener('contextmenu' , (e)=>{
            removeFromLS(li.querySelector('p').innerHTML)
            e.preventDefault()
            li.remove()
        })

        todos.appendChild(li)
    })
}


form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const todoText = input.value
    if(todoText) {

        if(!getTodosFromLocalStorage().some(todo => todo == input.value)){
            showTodosOnTheScreen(input.value)
            input.value = ''
        }else {
            return alert('Please add another todo because may not add same todo to the list')
        }
        
    }
})

function showTodosOnTheScreen(todo) {
    const li = document.createElement('li')

    li.innerHTML = `
        <p>${todo}</p>
    `

    li.addEventListener('dblclick' , ()=>{
        li.classList.toggle('completed')
    })

    li.addEventListener('contextmenu' , (e)=>{
        removeFromLS(li.querySelector('p').innerHTML)
        e.preventDefault()
        li.remove()
    })

    // Add todo LocalStorage
    addTodoLocalStorage(li.querySelector('p').textContent)


    todos.appendChild(li)
}

function addTodoLocalStorage(todo) {
    let getTodos = getTodosFromLocalStorage()
    if(!getTodos.some(todos => todos == todo)) {
        return localStorage.setItem('todos' , JSON.stringify([...getTodos , todo]))
    }
}

function removeFromLS(todo) {
    let getTodos = getTodosFromLocalStorage()
    return localStorage.setItem('todos' , JSON.stringify(getTodos.filter(todoLS => todoLS !== todo)))
}
