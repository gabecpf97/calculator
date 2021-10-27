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
    isFloat: false,
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

            case 'pos_neg':
                clickPosNeg();
                break;
            
            case 'decimal':
                clickDecimal();
                break;

            case 'delet':
                clickDelet();
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
        document.querySelector('.display').textContent = currEquation['x'];
    } else {
        currEquation['y'] += value;
        document.querySelector('.display').textContent = currEquation['y'];
    }
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
    currEquation['isFloat'] = false;
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
        let x = parseFloat(currEquation['x']);
        let y = parseFloat(currEquation['y']);
        let op = currEquation['operator'];
        if (op == '/' && y == 0) {
            alert('Cannot divide by zero, please type the number again');
            currEquation['y'] = "";
        } else {
            let result = operate(x, y, op)
            if (!Number.isInteger(result)){
                result = Math.round(result * 100000000) / 100000000
            }
            clickAC();
            currEquation['x'] = "" + result;
            document.querySelector('.display').textContent = result;
        }
        if (currEquation['x'].includes('.'))
            currEquation['isFloat'] = true;
    }
}

/**
 * Function that reset all the value in equation object
 */
function clickAC() {
    for (let key in currEquation) {
        if (key == 'firstDone')
            currEquation[key] = false;
        else if (key == 'isFloat')
            currEquation[key] = false;
        else 
            currEquation[key] = "";
    }
    document.querySelector('.display').textContent = "0";
}

/**
 * Function that change the value to either positive or 
 * negative
 */
function clickPosNeg() {
    if (!currEquation['firstDone']) {
        if (currEquation['x'].charAt(0) == '-')
            currEquation['x'] = currEquation['x'].substring(1);
        else 
            currEquation['x'] = '-' + currEquation['x'];
            document.querySelector('.display').textContent = currEquation['x'];
    } else {
        if (currEquation['y'].charAt(0) == '-')
            currEquation['y'] = currEquation['y'].substring(1);
        else
            currEquation['y'] = '-' + currEquation['y'];
            document.querySelector('.display').textContent = currEquation['y'];
    }
}

/**
 * Function that delet the value of either first or second number
 * if there are one digit left then it turn to zero
 */
function clickDelet() {
    if (!currEquation['firstDone'] && currEquation['x'] != "") {
        if (currEquation['x'].length == 1)
            currEquation['x'] = "0";
        else 
            currEquation['x'] = currEquation['x'].substring(0, currEquation['x'].length - 1);
        document.querySelector('.display').textContent = currEquation['x'];
    } else if (currEquation['firstDone'] && currEquation['y'] != ""){
        if (currEquation['y'].length == 1)
            currEquation['y'] = '0';
        else
            currEquation['y'] = currEquation['y'].substring(0, currEquation['y'].length - 1);
        document.querySelector('.display').textContent = currEquation['y'];
    }
}

/**
 * Function that add decimal point to the end of the values
 */
function clickDecimal() {
    if (!currEquation['isFloat']) {
        if (currEquation['firstDone']){
            currEquation['y'] += ".";
            document.querySelector('.display').textContent = currEquation['y'];
        } else {
            currEquation['x'] += ".";
            document.querySelector('.display').textContent = currEquation['x'];
        }
        currEquation['isFloat'] = true;
    }
}

/**
 * Add event listener to the page so that typing in keyboard will also work
 * except for postive and negative button
 */
document.querySelector('body').addEventListener('keypress', (e) => {
    let keyName = e.key;
    console.log(keyName);
    if (isNaN(parseInt(keyName))) {
        if (keyName == '-' || keyName == '+' || keyName == '/' || keyName == '*') {
            pressOp(keyName);
        } else {
            switch (keyName) {
                case '.':
                    clickDecimal();
                    break;

                case 'Backspace':
                    clickDelet();
                    break;
                
                case 'Enter':
                case '=':
                    clickEqual();

                case 'Escape':
                    clickAC();
                    break;

                default:
                    break;
            }
        }
    } else {
        document.querySelector(`.butt_${keyName}`).dispatchEvent(new Event('click'));
    }
});

/**
 * Function that are being called when an operation are being 
 * pressed
 * @param {*} keyName operation being pressed
 */
function pressOp(keyName) {
    if (currEquation['y'] != "") {
        clickEqual();
    }    
    currEquation['operator'] = keyName;
    currEquation['firstDone'] = true;
    currEquation['isFloat'] = false;
}