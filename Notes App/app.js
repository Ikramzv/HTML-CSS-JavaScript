const container = document.getElementById('container')
const addBtn = document.getElementById('addNote')

const notes = JSON.parse(localStorage.getItem('notes'))
if(notes){
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click' , ()=>{
    addNewNote()
})

function addNewNote(text = ''){
    let div = document.createElement('div')
    div.id = "note" 
    div.classList.toggle('note')
   
    div.innerHTML = `
    <div class="note-header">
        <div class="left">
            <button id="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button  id="delete-btn">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        <div class="right">
            <button>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <div class="note-body">
        <textarea class="${text ? 'hidden' : ''}"></textarea>
    </div>
    
    `
    const editBtn = div.querySelector('#edit-btn')
    const deleteBtn = div.querySelector('#delete-btn')
    const textArea = div.querySelector('textarea')
    const mainEl = div.querySelector('.main')

    textArea.value = text
    mainEl.innerHTML = marked.parse(text)

    
    editBtn.addEventListener('click' , ()=>{
        mainEl.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })
    
    textArea.addEventListener('input' , (e)=>{
        let {value} = e.target
        mainEl.innerHTML = marked.parse(`${value}`);

        updateLS()
    })

    deleteBtn.addEventListener('click' , ()=>{
        removeFromLS(textArea.value)
        div.remove()
    })

    container.appendChild(div)
}

function removeFromLS(text) {
    return localStorage.setItem('notes' , JSON.stringify(JSON.parse(localStorage.getItem('notes')).filter(note => note !== text)))
}

 
function updateLS() {
    let notesText = document.querySelectorAll('textarea')

    let notes = []

    notesText.forEach(note =>{ 
        notes.push(note.value)
    })
    
    localStorage.setItem('notes' , JSON.stringify(notes.filter(note => note.length > 0)))
    
}