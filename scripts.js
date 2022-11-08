const buttons = document.querySelectorAll('[class=keys]');
const displayPrevious = document.getElementById('displayPrevious');
const displayOperator = document.getElementById('displayOperator');
const displayLast = document.getElementById('displayLast');
const displayExpression = document.getElementById('displayExpression');

let previousIn = '';
let lastIn = '';
let operator = '';
let result = '';
let bufferFull = false;

buttons.forEach(button => button.addEventListener('click', buildBuffer));
buttons[2].addEventListener('click', clear)

function clear() {
	previousIn = '';
	lastIn = '';
	operator = '';
	result = '';
	displayExpression.textContent = '';
	displayPrevious.textContent = previousIn;
	displayOperator.textContent = operator;
	displayLast.textContent = lastIn;
}

function checkBuffer() {
	if(previousIn === '' ||
		lastIn === '' ||
		operator === '') {
		bufferFull = false;
	} else {
		bufferFull = true;
	}
}

function buildBuffer() {
	checkBuffer();
	if(this.id === 'digit') {
		lastIn += this.textContent;
		displayLast.textContent = lastIn;
	} else if(this.id === 'operator' && operator === '') {
		operator = this.textContent;
		previousIn = Number(lastIn);
		lastIn = '';
	} else if(this.id === 'operator' && bufferFull) {
		lastIn = Number(lastIn);
		operate(operator);
		displayExpression.textContent = `${previousIn} ${operator} ${lastIn} =`;
		previousIn = result;
		operator = this.textContent;
		lastIn = '';
	} else if(this.id === 'calc') {
		lastIn = Number(lastIn);
		operate(operator);
		displayExpression.textContent = `${previousIn} ${operator} ${lastIn} =`;
		lastIn = operate(operator);
		previousIn = '';
		operator = '';
	}
	displayPrevious.textContent = previousIn;
	displayOperator.textContent = operator;
	displayLast.textContent = lastIn;
}

function operate(operator) {
	switch (operator) {
		case '+':
			result = previousIn + lastIn;
			break;
		case '-':
			result = previousIn - lastIn;
			break;
		case 'x':
			result = previousIn * lastIn;
			break;
		case '÷':
			result = previousIn / lastIn;
			break;
		case '^':
			result = previousIn ** lastIn;
			break;
	}
	result = Math.round((result + Number.EPSILON) * 100) / 100;
	return result;
}
