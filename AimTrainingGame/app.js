const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    const id = setInterval(() => {
        if ( time === 0 ) {
            finishGame()
            clearInterval(id)
        } else {
            let current = --time
            if (current < 10) {
                current = `0${current}`
            }
            setTime(current)
        }
        
    }, 1000)
    createRandomCircle()
    setTime(time)
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Your score: <span class="primary">${score}</span>`
    resetGame()
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = getRandomBackground()

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}

function resetGame() {
    const repeatBtn = document.createElement('button')

    repeatBtn.innerText = 'try again'
    repeatBtn.classList.add('repeat')

    board.append(repeatBtn)

    repeatBtn.addEventListener('click', () => {
        screens[1].classList.remove('up')
        
        timeEl.parentNode.classList.remove('hide')

        board.innerHTML = ""
        
        time = 0
        score = 0

    }) 
}

function getRandomColor() {
    const color = `rgb(${Math.ceil(Math.random()*255)}, ${Math.ceil(Math.random()*255)}, ${Math.ceil(Math.random()*255)})`
    return color
}

function getRandomBackground() {
    return `linear-gradient(90deg, ${getRandomColor()} 0%, ${getRandomColor()} 100%)`
}