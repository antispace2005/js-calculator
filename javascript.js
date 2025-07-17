let numbers = ['0', '0']
const display = document.querySelector(".screen")
let decimal = false;
let currentNumber = 0
let operator = ""
let lastPressIsEqual = false;
function add(a, b) {
    return parseFloat(a) + parseFloat(b)
}
function subtract(a, b) {
    return parseFloat(a) - parseFloat(b)
}
function multiply(a, b) {
    return parseFloat(a) * parseFloat(b)
}
function divide(a, b) {
    return parseFloat(a) / parseFloat(b)
}


function operate(equal = false) {

    let a = numbers[0];
    let b = numbers[1];
    let result = a;
    if (currentNumber == 1 || equal) {
        if (operator == "+") {
            result = add(a, b);
        } else if (operator == "-") {
            result = subtract(a, b)
        } else if (operator == "*") {
            result = multiply(a, b)
        } else if (operator == "/") {
            result = divide(a, b)
        } else return;
        numbers[1] = "0"
        decimal = false;
        operator = '';
    } else {
        currentNumber = 1;
        decimal = false;
    }
    display.textContent = result;
    if(equal){lastPressIsEqual = true}
    numbers[0] = result;
}


function numberKeysAction(e) {
    if (lastPressIsEqual){
        clearKeyAction()
        lastPressIsEqual = false
    }
    if (numbers[currentNumber].length > 16) {
        return
    } else if (numbers[currentNumber] == '0') {
        numbers[currentNumber] = e.target.textContent
    } else {
        numbers[currentNumber] += e.target.textContent

    }

    display.textContent = numbers[currentNumber]

}
function decimalKeyAction(e) {
    if (lastPressIsEqual){
        clearKeyAction()
        lastPressIsEqual = false
    }
    if (decimal) return;
    numbers[currentNumber] += "."
    display.textContent = numbers[currentNumber]
    decimal = true;
}
function operatorKeyAction(e) {
    lastPressIsEqual = false
    operate()
    operator = e.target.textContent;

}

function deleteKeyAction(e) {
    numbers[currentNumber] = numbers[currentNumber].slice(0, -1);
    if (numbers[currentNumber] == "") numbers[currentNumber] = '0';
    display.textContent = numbers[currentNumber]

}

function clearKeyAction(e) {
    numbers = ['0', '0']
    decimal = false;
    currentNumber = 0
    operator = ""
    display.textContent = numbers[currentNumber]


}


function initKeys() {

    const numberKeys = document.querySelectorAll(`.number`)
    for (let i = 0; i < numberKeys.length; i++) {
        numberKeys[i].addEventListener("click", numberKeysAction)
    }

    const decimalKey = document.querySelector(".decimal")
    decimalKey.addEventListener('click', decimalKeyAction)

    const operatorKeys = document.querySelectorAll(`.operator`)
    for (let i = 0; i < operatorKeys.length; i++) {
        operatorKeys[i].addEventListener("click", operatorKeyAction)
    }

    const equalKey = document.querySelector(".equal")
    equalKey.addEventListener('click', () => operate(true))

    const deleteKey = document.querySelector(".del")
    deleteKey.addEventListener('click', deleteKeyAction)

    const clearKey = document.querySelector(".clear")
    clearKey.addEventListener('click', clearKeyAction)
}

initKeys()