let input1 = 10;
let input2 = 2;
let result = 0;

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
	console.log(result);
	document.getElementById('display').textContent = result;
}

operate('add');
operate('minus');
operate('times');
operate('divide');
