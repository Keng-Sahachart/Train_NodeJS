// แบบ ที่ 1  export แค่ fnc เดียว  ตัวแปรที่รับ require ไปจะมองว่า เป็น ฟังก์ชั่นนี้
// const sum = require('./app.js')
// const result = sum.multiply(10, 20)
// console.log('main.js > ', result)
/******************************************************** */
const app = require('./app');
console.log(app.name);
console.log(app.hello);
console.log('sum = >' , app.sum(10, 20));
console.log('multiply = >' , app.multiply(10, 20));


