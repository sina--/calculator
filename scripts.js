const buttons = document.querySelectorAll('[class=keys]');
const displayPrevious = document.getElementById('displayPrevious');
const displayOperator = document.getElementById('displayOperator');
const displayLast = document.getElementById('displayLast');
const displayExpression = document.getElementById('displayExpression');
const digits = ['0','1','2','3','4','5','6','7','8','9','.'];
const operators = ['+', '-', 'x', '^', '÷'];

let previousIn = '';
let lastIn = '';
let operator = '';
let result = '';
let bufferFull = false;

buttons.forEach(button => button.addEventListener('click', (event) => {buildBuffer(event.target)}));
document.addEventListener('keypress', (event) => {onKeyPress(event.key)});
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

function onKeyPress(key) {
	console.log(key);
	let tempData = {};
	if(digits.includes(key)){
		tempData = {
			id: 'digit',
			textContent: key,
		};
	} 
	if(operators.includes(key)){
		tempData = {
			id: 'operator',
			textContent: key,
		};
	}
	if(key === 'Enter' || key === '=') {
		tempData = {
			id: 'calc',
			textContent: key,
		};
	}
	buildBuffer(tempData);
}

function buildBuffer(data = null) {
	console.log(data);
	if(data != null) {
		this.id = data.id;
		this.textContent = data.textContent;
	}
	console.log(this.id);
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
