const buttons = document.querySelectorAll('[class=keys]');
const displayPrevious = document.getElementById('displayPrevious');
const displayOperator = document.getElementById('displayOperator');
const displayLast = document.getElementById('displayLast');
const displayExpression = document.getElementById('displayExpression');

let previousIn = '';
let lastIn = '';
let operator = '';
let previousOperator = '';
let result = '';
let doMath = false;
let pressEqual = false;

buttons.forEach(button => button.addEventListener('click', buildBuffer));

function buildBuffer() {
	if(this.id === 'digit') {
		if(pressEqual) {
	//		clear();
		}
		lastIn += this.textContent;
		displayLast.textContent = lastIn;
	} else if(this.id === 'operator') {
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
	if(operator != '=') {
		displayOperator.textContent = operator;
	} else {
		displayOperator.textContent = '';
	}
	displayLast.textContent = lastIn;
}

function operate(operator) {
	previousIn = Number(previousIn);
	let tempPrevIn = previousIn;
	lastIn = Number(lastIn);
	console.log(previousOperator, previousIn, lastIn);
	pressEqual = false;
	if(doMath === true) {		
		switch(previousOperator) {
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
		displayExpression.textContent = `${previousIn} ${operator} ${lastIn} =`;
		previousIn = result;
	} else {
		previousIn = lastIn
		doMath = true;
	}
	if(operator === '=') {
		displayExpression.textContent = `${tempPrevIn} ${previousOperator} ${lastIn} =`;
		pressEqual = true;
		doMath = false;
		console.log(pressEqual);
	}
	previousOperator = operator;
	return result;
}

function clear() {
	displayExpression.textContent = '';
	previousIn = '';
	operator = '';
	lastIn = '';
	result = '';
}
