const numButtons = document.querySelectorAll('[id=digit]');
const opButtons = document.querySelectorAll('[id=operator]');
const displayPrevious = document.getElementById('displayPrevious');
const displayOperator = document.getElementById('displayOperator');
const displayLast = document.getElementById('displayLast');
const displayExpression = document.getElementById('displayExpression');

let previousIn = '';
let lastIn = '';
let operator = '';
let result = '';

numButtons.forEach(numButton => numButton.addEventListener('click', buildBuffer));
opButtons.forEach(opButton => opButton.addEventListener('click', buildBuffer));
document.getElementById('calc').addEventListener('click', buildBuffer);
document.getElementById('clear').addEventListener('click', buildBuffer);

function buildBuffer() {
	if(this.id === 'digit') {
		lastIn += this.textContent;
		displayLast.textContent = lastIn;
	} else if(this.id === 'operator') {
		//if(operator === '') {
				
		operator = this.textContent;
		operate(operator);
		//previousIn = Number(lastIn);
		lastIn = '';
	}
	//else if(this.id === 'calc') {
	//	lastIn = Number(lastIn);
	//	operate(operator);
	//	lastIn = operate(operator);
	//	previousIn = '';
	//	operator = '';
	//} 
	else if(this.id === 'clear') {
		clear();
	}
	displayPrevious.textContent = previousIn;
	displayOperator.textContent = operator;
	displayLast.textContent = lastIn;
}

function operate(operator) {
	previousIn = Number(previousIn);
	lastIn = Number(lastIn);
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
		case '=':
		//	return result;
			break;
	}
	result = Math.round((result + Number.EPSILON) * 100) / 100;
	displayExpression.textContent = `${previousIn} ${operator} ${lastIn} =`;
	previousIn = result;
	operator = '';
	return result;
}

function clear() {
	displayExpression.textContent = '';
	previousIn = '';
	operator = '';
	lastIn = '';
	result = '';
}
