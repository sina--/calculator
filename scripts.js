const numButtons = document.querySelectorAll('[id=digit]');
const opButtons = document.querySelectorAll('[id=operator]');
const display = document.getElementById('display');

let previousIn = '';
let lastIn = '';
let operator = '';
let result = '';

numButtons.forEach(numButton => numButton.addEventListener('click', buildBuffer));
opButtons.forEach(opButton => opButton.addEventListener('click', buildBuffer));
document.getElementById('calc').addEventListener('click', buildBuffer);

function buildBuffer() {
	if(this.id === 'digit') {
		lastIn += this.textContent;
		display.textContent = lastIn;
	} else if(this.id === 'operator') {
		previousIn = Number(lastIn);
		lastIn = '';
		operator = this.textContent;
		display.textContent = operator;
	} else if(this.id === 'calc') {
		lastIn = Number(lastIn);
		operate(operator);
		previousIn = lastIn;
		lastIn = result;
		display.textContent = result;
	}
}

function operate(operator) {
	switch (operator) {
		case '+':
			result = previousIn + lastIn;
			break;
		case '-':
			result = previousIn - lastIn;
			break;
		case '*':
			result = previousIn * lastIn;
			break;
		case '/':
			result = (previousIn / lastIn).toFixed(2);
			break
	}
	return result;
}
