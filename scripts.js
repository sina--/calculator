const numButtons = document.querySelectorAll('[id=digit]');
const opButtons = document.querySelectorAll('[id=operator]');
const allOp = ['+', '-', '*', '/'];

let lastIn = '';
let previousIn = '';
let operator = '';
let buffer = [];

numButtons.forEach(numButton => numButton.addEventListener('click', buildBuffer));
opButtons.forEach(opButton => opButton.addEventListener('click', buildBuffer));

function buildBuffer() {
	if(this.id === 'digit') {
		lastIn += this.textContent;
		console.log(lastIn);
	} else if(this.id === 'operator') {
		previousIn = lastIn;
		lastIn = '';
		console.log(previousIn);
		console.log(this.id);
	}
}

function operate(operator) {
	switch (operator) {
		case 'add':
			result = input1 + input2;
			break;
		case 'minus':
			result = input1 - input2;
			break;
		case 'times':
			result = input1 * input2;
			break;
		case 'divide':
			result = (input1 / input2).toFixed(2);
			break
	}
	document.getElementById('display').textContent = result;
}
