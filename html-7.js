let countObj = document.querySelector('#counter')
let forLoopObj = document.querySelector('#forLoopResult')
let oddLoopObj = document.querySelector('#oddNumberResult')

let counter = parseInt(document.querySelector('#counter').textContent, 10)



function tickUp() {
    counter++
    countObj.textContent = counter
}

function tickDown() {
    if (counter > 0) {
        counter--
        countObj.textContent = counter
    }
}

function runForLoop() {
    var ret = ''
    for (let i = 0; i <= counter; i++) {
        ret = `${ret}${i} `
    }
    forLoopObj.textContent = ret;
}

function showOddNumbers() {
    var ret = ''
    for (let i = 0; i <= counter; i++) {
        if (i % 2 != 0){
            ret = `${ret}${i} `
        }
    }
    oddLoopObj.textContent = ret;
}

function addMultiplesToArray() {
    var ret = []
    for (let i = counter; i > 4; i--) {
        if (i % 5 == 0 && i > 4) {
            ret.push(i);
        }
    }
    console.log(ret)
}

function printCarObject() {
    let car1 = document.querySelector('#carType').value
    let car2 = document.querySelector('#carMPG').value
    let car3 = document.querySelector('#carColor').value

    let carObj = { cType: car1, cMPG: car2, cColor: car3}

    console.log(carObj)


}

function loadCar(car) {
    switch(car) {
        case 1:
            console.log(carObject1)
            break;
        case 2:
            console.log(carObject2)
            break;
        case 3:
            console.log(carObject3)
            break;
    }
}

function changeColor(color) {
    let para = document.querySelector('#styleParagraph')
    switch(color) {
        case 1:
            para.style.color = 'red'
            break;
        case 2:
            para.style.color = 'green'
            break;
        case 3:
            para.style.color = 'blue'
            break;
    }
}
