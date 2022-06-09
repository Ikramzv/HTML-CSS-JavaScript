const quizData = [
    {
        question: "How old is Florin old ?",
        a: '10',
        b: '17',
        c: '26',
        d: '61',
        correct: 'c',
    } ,
    {
        question: 'What was the most used programmin language in 2019 ?',
        a: 'Java' , 
        b: 'Python' , 
        c: 'C' ,
        d: 'JavaScript',
        correct: 'a'
    },
    {
        question: 'Who is the president of USA ?',
        a: 'Florin Pop' , 
        b: 'Donald Trump' , 
        c: 'Ivan Soldano' ,
        d: 'Joe Biden',
        correct: 'd'
    },
    {
        question: 'What does HTML stand for ?',
        a: 'Hyper Text Markup language' ,
        b: 'Cascading Style Sheet',
        c: 'Json Object Notation',
        d: 'Hyper text language',
        correct: 'a'
    },
    {
        question: 'What year was JavaScript launched?',
        a: '1992',
        b: '1989',
        c: '1995',
        d: '1994',
        correct: 'c'
    }
]

const errMsg = 'Please provide the answer'

const questionEl = document.getElementById('question')
const answers = document.querySelectorAll('.answer')


const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')


let score = 0
let currentQuiz = 0
let currentQuizData = quizData[currentQuiz]
questionEl.innerHTML = currentQuizData.question
a_text.innerHTML = currentQuizData.a
b_text.innerHTML = currentQuizData.b
c_text.innerHTML = currentQuizData.c
d_text.innerHTML = currentQuizData.d

function loadQuiz() {
    deSelect()
    currentQuizData = quizData[currentQuiz]
    questionEl.innerHTML = currentQuizData.question
    a_text.innerHTML = currentQuizData.a
    b_text.innerHTML = currentQuizData.b
    c_text.innerHTML = currentQuizData.c
    d_text.innerHTML = currentQuizData.d
}

function getSelected() {
    let selectedAnswer = undefined

    answers.forEach((answer) => {
        if(answer.checked){
            selectedAnswer = answer.id
        }
    })
    return selectedAnswer
}

function deSelect() {
    answers.forEach(answer => {
        if(answer.checked) {
            answer.checked = false
        }
    })
}


document.querySelector('.container-footer button').addEventListener('click' , ()=>{
    let selected = getSelected()
    if(selected){
        document.getElementById('errMsg').innerHTML = ""
        if(selected === quizData[currentQuiz].correct){
            score++
            console.log(score);
        }
        console.log(selected)
        currentQuiz++
        if(currentQuiz < quizData.length) {
            loadQuiz()
        }else {
            document.getElementById('quiz').style.width = 'fit-content'  
            document.getElementById('quiz').style.height = 'fit-content'  
            document.getElementById('quiz').style.textAlign = 'center'
            document.getElementById('quiz').style.color = 'green'
            document.getElementById('quiz').innerHTML = `<h2>You scored correctly ${score}/${quizData.length} questions. Congratssss !!</h2>
            <button onclick="location.reload()" class="btn">Reload</button>
            `
        }
    }else {
        document.getElementById('errMsg').style.color = "red"
        document.getElementById('errMsg').innerHTML = errMsg
    }

})
 