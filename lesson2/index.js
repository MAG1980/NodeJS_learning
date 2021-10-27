const EventEmitter = require ('events')
class MyEmitter extends EventEmitter {};
const timeEmitter = new MyEmitter();

// timeEmitter.on('hour', Handler.hour);
// timeEmitter.on('day', Handler.day);
// timeEmitter.on('month', Handler.month);
// timeEmitter.on('year', Handler.year);

console.log('Hi!')
let input = process.argv[2]
console.log(input)
let arr = input.split('-')
console.log(arr)
delay = (	timeUnit, unitValue) => {
	let coefficient = 1

		switch (timeUnit){
			case 'hour': {
				coefficient = 3600 * 1000;
				break;
			}
			case 'day': {
				coefficient =  86400 * 1000;
				break;
			}
			case 'month': {
				coefficient = 2592000 * 1000;
				break;
			}
			case 'year': {
				coefficient = 31536000 * 1000;
				break;
			}
		}
		return coefficient *unitValue;
};
let startDay = arr[1];
let dayIncrement = setInterval(() => {
		if (startDay === 0) {
			timeEmitter.emit('day');
			clearInterval(dayIncrement);
			return
		}
	startDay = startDay - 1;
}, 3000);
setInterval(() => {
		console.log(`Осталось ${arr[0]} часов
		${startDay} дней
		${arr[2]} месяц(ев)
		${arr[3]} лет.` )
}, 3000)
// class Handler {
// 	static hour (payload){
// 		console.log("Hour's is out")
// 	}
// 	static day (payload){
// 		console.log("Day's is out")
// 	}
// 	static month (payload){
// 		console.log("Month's is out")
// 	}
// 	static year (payload){
// 		console.log("Year's is out")
// 	}
// }
