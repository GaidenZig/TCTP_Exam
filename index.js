const { problema1, problema2, problema3, problema4, data} = require('./src/p1');
const startPromise = require('./src/p2');

console.log('problema 1.1: ');
console.log(problema1(data));

console.log(' ');
console.log('problema 1.2');
console.log(problema2(data,2));

console.log(' ');
console.log('problema 1.3');
console.log(problema3(data));

console.log(' ');
console.log('problema 1.4');
console.log(problema4(data));

console.log(' ');
console.log('problema 2');
startPromise().then(e => console.log(e));
