const numButtons = document.querySelectorAll('[id=digit]');
const opButtons = document.querySelectorAll('[id=operator]');
const allOp = ['+', '-', '*', '/'];

numButtons.forEach(numButton => numButton.addEventListener('click', init));
opButtons.forEach(opButton => opButton.addEventListener('click', getOp));

function init() {
	let in1 = '';
	in1 = this.textContent;
	document.getElementById('display').textContent = in1;
}

function getOp() {
	let in1 = '';
	in1 = this.textContent;
	console.log(in1);
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
