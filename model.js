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
    switch (operate) {
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

// Call function to create Pad in html
createPad();

/**
 * Function that call other function to create the whole pad
 */
function createPad() {
    createNumPad();
    createOp();
    createEqual();
}

/**
 * Create all the number in pad
 */
function createNumPad() {
    const container = document.querySelector('.container');
    for(let i = 0; i < 10; i++) {
        let numPad = document.createElement('button');
        numPad.classList.add(`butt_${i}`);
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
        opButt.classList.add(`butt_${ops[op]}`);
        opButt.textContent = `${ops[op]}`;
        container.appendChild(opButt);
    }
}

/**
 * Create equal sign in pad
 */
function createEqual() {
    const container = document.querySelector('.container');
    const equalSign = document.createElement('button');
    equalSign.classList.add('butt_=');
    equalSign.textContent = '=';
    container.appendChild(equalSign);
}