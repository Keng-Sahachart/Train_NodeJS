const name = 'Devahoy';
const hello = name => `Hello ${name}`;
const add = (a, b) => a + b;
const multiply= (a, b) => a * b;
const result = add(2, 3);
const result1 = multiply(3, 4);
console.log('result', result);
console.log('result', result1);

exports.myDateTime = function () {
    return Date();
  };
  

module.exports = { add,multiply};