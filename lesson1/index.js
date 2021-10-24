require('nodemon')
const colors = require ('colors/safe')
let lowBorder = + process.argv[2]
let upBorder = + process.argv[3]
let colorIndex = 0
let currentColor = null
// console.log(colors.red('Hi!'))
// console.log(colors.green(process.argv[2]), colors.yellow(process.argv[3]), colors.red(process.argv[4]))



if (isNaN(lowBorder) || isNaN(upBorder) || (lowBorder >= upBorder))  {
	console.log("Введённые данные некорректны:")
	if (isNaN(lowBorder)) {
		console.log(colors.red(`Нижняя граница не является числом: ${lowBorder}`))
	}
	if (isNaN(upBorder)) {
		console.log(colors.red(`Верхняя граница не является числом: ${upBorder}`))
	}
	if (lowBorder >= upBorder) {
		console.log(colors.red(`Верхняя граница равна или ниже нижней`))
	}
	return false
}

for ( i = lowBorder; i <= upBorder; i++) {
if (isPrimeNum(i)) {
	switch (colorIndex) {
		case 0: {
			currentColor = "red"
			colorIndex ++
			break
		}
		case 1: {
			currentColor = "yellow"
			colorIndex ++
			break
		}
		case 2: {
			currentColor = "green"
			colorIndex ++
			break
		}
	}
	console.log(currentColor)
	printNumber(currentColor, i)
	if (colorIndex > 2) {
		colorIndex = 0
	}
}
}

function printNumber(currentColor, i){
	switch (currentColor) {
		case "red": {
			console.log(colors.red(i))
			break
		}
		case "yellow": {
			console.log(colors.yellow(i))
			break
		}
		case "green": {
			console.log(colors.green(i))
			break
		}
	}
}
function isPrimeNum (number) {
	if (number <= 1){
		return false
	}
	for (n = 2; n < number; n++ ){
		if ( number % n === 0) {
			return false
		}
		return true
	}
}
