// Call function to create Pad in html
createPad();

/**
 * Function that call other function to create the whole pad
 */
function createPad() {
    createDisplay();
    createNumPad();
    createOp();
    createEqualResultAC();
}

/**
 * Function that create the display for number entered or result
 */
function createDisplay() {
    const container = document.querySelector('.container');
    const display = document.createElement('div');
    display.classList.add('display');
    display.textContent = "0";
    container.appendChild(display);
}

/**
 * Create all the number in pad
 */
function createNumPad() {
    const container = document.querySelector('.container');
    for(let i = 0; i < 10; i++) {
        let numPad = document.createElement('button');
        numPad.classList.add(`butt_${i}`, 'num');
        numPad.textContent = `${i}`;
        container.appendChild(numPad);
    }
}

/**
 * Create all the operator in pad
 */
function createOp() {
    const ops = ['+', '-', '*', '/'];
    const container = document.querySelector('.container');
    for(op in ops){
        let opButt = document.createElement('button');
        opButt.classList.add(`butt_${ops[op]}`, 'op');
        opButt.textContent = `${ops[op]}`;
        container.appendChild(opButt);
    }
}

/**
 * Create equal, AC button in pad
 */
function createEqualResultAC() {
    const container = document.querySelector('.container');
    const equalSign = document.createElement('button');
    const acSign = document.createElement('button');
    equalSign.classList.add('butt_=', 'equal');
    equalSign.textContent = '=';
    acSign.classList.add('butt', 'ac');
    acSign.textContent = 'AC';
    container.appendChild(equalSign);
    container.appendChild(acSign);
}

/**
 * Function that add two numbers
 * @param {*} x first number
 * @param {*} y second number
 * @returns result of the operation
 */
function addition(x, y) {
    return x + y;
}

/**
 * Function that subtract two numbers
 * @param {*} x first number
 * @param {*} y second number
 * @returns result of the operation
 */
function subtraction(x, y) {
    return x - y;
}

/**
 * Function that multiple two numbers
 * @param {*} x first number
 * @param {*} y second number
 * @returns result of the operation
 */
function multiplication(x, y) {
    return x * y;
}

/**
 * Function that divide two numbers
 * @param {*} x first number
 * @param {*} y second number
 * @returns result of the operation
 */
function division(x, y) {
    return x / y;
}

/**
 * Function that call the appropriate function base on
 * the operator
 * @param {*} x first number 
 * @param {*} y second number
 * @param {*} operator operator
 * @returns result of the operation
 */
function operate(x, y, operator) {
    switch (operator) {
        case '+':
            return addition(x, y);

        case '-':
            return subtraction(x, y);

        case '*':
            return multiplication(x, y);

        case '/':
            return division(x, y);
    }
}

/**
 * Equaltion object that contain the two number, operator
 * and whether the first number is finish typing
 */
let currEquation = {
    x: "",
    y: "",
    operator: "",
    firstDone: false,
};

/**
 * Add eventlistener to all button and call accounding function
 */
const butts = document.querySelectorAll('button');
butts.forEach(butt => {
    butt.addEventListener('click', (e) => {
        const clicked = butt.classList.item(1);
        switch (clicked) {
            case 'num':
                clickNum(butt);
                break;
            
            case 'op':
                clickOp(butt);
                break;
    
            case 'equal':
                clickEqual();
                break;

            case 'ac':
                clickAC();
                break;
        }
    });
});

/**
 * Function that append the number type to either
 * the first or second number in the equation
 * @param {*} butt button that are being clicked
 */
function clickNum(butt) {
    let name = butt.classList.item(0);
    let value = name.substring(name.length - 1);
    if (currEquation['firstDone'] == false) {
        currEquation['x'] += value;
    } else {
        currEquation['y'] += value;
    }
    document.querySelector('.display').textContent = value;
}

/**
 * Function that store the operator being clicked to
 * the equation object and display the result if there
 * are already two value entered
 * @param {*} butt button that are being clicked
 */
function clickOp(butt) {
    let name = butt.classList.item(0);
    let value = name.substring(name.length - 1);
    if (currEquation['y'] != "") {
        clickEqual();
    }    
    currEquation['operator'] = value;
    currEquation['firstDone'] = true;

}

/**
 * Function that call operate function which calculate 
 * the result and store it to the first number in the 
 * equation object and display it in the result div.
 * Would not work if there are missing value of the two number
 * or it is dividing zero 
 */
function clickEqual() {
    if (currEquation['x'] != "" && currEquation['y'] != "" && 
                        currEquation['operator'] != "") {
        let x = parseInt(currEquation['x']);
        let y = parseInt(currEquation['y']);
        let op = currEquation['operator'];
        if (op == '/' && y == 0) {
            alert('Cannot divide by zero, please type the number again');
            currEquation['y'] = "";
        } else {
            let result = operate(x, y, op)
            if (!Number.isInteger(result)){
                result = Math.round(result * 1000) / 1000
            }
            clickAC();
            currEquation['x'] = result;
            document.querySelector('.display').textContent = result;
        }
    }
}

/**
 * Function that reset all the value in equation object
 */
function clickAC() {
    for (let key in currEquation) {
        if (key == 'firstDone')
            currEquation[key] = false;
        else 
            currEquation[key] = "";
    }
    document.querySelector('.display').textContent = "0";
}