// const workButton = document.querySelector("#work")
// const breakButton = document.querySelector("#break")

// const workContainer = document.querySelector(".work-container")
// const breakContainer = document.querySelector(".break-container")

// const workTimes = document.getElementsByClassName("work-time")
// const breakTimes = document.querySelectorAll(".break-time")
// const buttons = document.getElementsByClassName('btn');

// const minuteDisplay = document.getElementById("min")
// const secondDisplay = document.getElementById('seconds')

// let seconds=00
// startDefault()

// function startDefault(){
//     breakContainer.classList.add("hide")
//     workContainer.classList.remove("hide")
//     workButton.setAttribute("checked", "")
//     workTimes[1].setAttribute("checked",'')
//     buttons[0].classList.remove("hide")
//     seconds = 25*60
//     setTimeDisplay(seconds)
// }

// for(let time of workTimes){
//     time.addEventListener('click', ()=>{
//         if(time.checked){
//             seconds = time.value*60
//             setTimeDisplay(seconds)
//         }
//     })
// }

// buttons[0].addEventListener('click', ()=>{
//     countDown()
// })

// function countDown(){
//     let tempSeconds = seconds
//     buttons[0].classList.add('hide')
//     buttons[1].classList.remove('hide')
//     let id = setInterval(()=>{
//        tempSeconds-=1; 
//        setTimeDisplay(tempSeconds)
//     }, 1000)
//     // setTimeout(()=>{
//     //     clearInterval(id)
//     // }, seconds)
// }

// function setTimeDisplay(tempSeconds){
//     minuteDisplay.innerText = Math.floor(tempSeconds/60);
//     secondDisplay.innerText = tempSeconds%60;
// }

// workButton.addEventListener('click', startDefault);

// breakButton.addEventListener('click', ()=>{
//     workContainer.classList.add("hide")
//     breakContainer.classList.remove("hide")
//     breakTimes[0].setAttribute("checked", "")
// })

// ***********************************************

const workButton = document.querySelector("#work")
const breakButton = document.querySelector("#break")

const workContainer = document.querySelector(".work-container")
const breakContainer = document.querySelector(".break-container")

const workTimes = document.getElementsByClassName("work-time")  // 15, 25, 35
const breakTimes = document.querySelectorAll(".break-time") // short, long
const buttons = document.getElementsByClassName('btn'); //play, pause, reset
const allInputs = document.getElementsByTagName("input")

const minuteDisplay = document.getElementById("min")
const secondDisplay = document.getElementById('seconds')

let countdownTime = 0;
let currentMode = '';
let currentSelectedTime = '';

function startDefault(){
    workMode(workTimes[1])  // 25
}

workButton.addEventListener('click', ()=>{
    workContainer.classList.remove("hide")
    breakContainer.classList.add('hide')
    workTimes[1].setAttribute("checked", "")
    countdownTime = workTimes[1].defaultValue*60
    setDisplayTime(countdownTime)
})

breakButton.addEventListener('click', ()=>{
    workContainer.classList.add("hide")
    breakContainer.classList.remove('hide')
    breakTimes[0].setAttribute("checked", "")
    countdownTime = breakTimes[0].defaultValue*60
    setDisplayTime(countdownTime)
})

for(let i=0; i<workTimes.length; i++){
    workTimes[i].addEventListener('click', ()=>{
        workMode(workTimes[i])
    })
}

for(let i=0; i<breakTimes.length; i++){
    breakTimes[i].addEventListener('click', ()=>{
        breakMode(breakTimes[i])
    })
}

function workMode(selectedTimeElement){    // ****
    currentMode = 'work'
    currentSelectedTime = selectedTimeElement
    breakContainer.classList.add("hide")
    workButton.setAttribute("checked", "")
    
    selectedTimeElement.setAttribute("checked", "")
    countdownTime = (selectedTimeElement.defaultValue)*60
    setDisplayTime(countdownTime)
    buttons[0].classList.remove("hide") // play button
    buttons[0].removeAttribute('disabled')
    
    buttons[0].addEventListener('click', ()=>{
        countdownOn(countdownTime)
        buttons[1].classList.remove('hide')
        buttons[1].removeAttribute('disabled')
    })
}

function breakMode(selectedTimeElement){   // ****
    currentMode = 'break';
    currentSelectedTime = selectedTimeElement
    workContainer.classList.add("hide")
    breakButton.setAttribute("checked", "")
    
    selectedTimeElement.setAttribute('checked', '')
    countdownTime = (selectedTimeElement.defaultValue)*60
    setDisplayTime(countdownTime)
    buttons[0].classList.remove("hide") // play button
    buttons[0].removeAttribute('disabled')
    
    buttons[0].addEventListener('click', ()=>{
        buttons[1].classList.remove('hide')
        buttons[1].removeAttribute('disabled')
        countdownOn(countdownTime)
    })
}

function restartCurrentMode(){
    if(currentMode==='work'){workMode(currentSelectedTime)}
    else{breakMode(currentSelectedTime)}
}

function setDisplayTime(displayTime){   // ****
        minuteDisplay.innerText = Math.floor(String(displayTime/60).padStart(2, '0'));
        secondDisplay.innerText = String(displayTime%60).padStart(2, '0');
}

function countdownOn(){ // ****
    for(let input of allInputs){
        input.disabled = true
    }
    const id = setInterval(()=>{
        countdownTime-=1;
        setDisplayTime(countdownTime)
        if(countdownTime==0){
            clearInterval(id);
            countdownEnds()
            return
        }
        buttons[1].addEventListener('click', ()=>{
            clearInterval(id);
            return
        })
    }, 1000);
}

function countdownEnds(){   // ****
    buttons[0].setAttribute('disabled', '') //play
    buttons[0].classList.add('hide')
    buttons[1].setAttribute('disabled', "") //pause
    buttons[1].classList.add('hide')
    buttons[2].removeAttribute('disabled')  //reset
    buttons[2].classList.remove('hide')
    for(let input of allInputs){
        input.disabled = false
    }
    buttons[2].addEventListener('click', restartCurrentMode)
}

startDefault()