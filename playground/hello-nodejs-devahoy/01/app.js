const name = 'Devahoy';
const hello = name => `Hello ${name}`;
const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;
// const result = sum(2, 3);
// console.log('result', result);

/**  แบบ ที่ 1 กำหนดให้ export เลย export แค่ fnc เดียว  
 * ตัวแปรที่รับ require ไปจะมองว่า เป็น ฟังก์ชั่นนี้ */
// module.exports = sum; 

/** แบบ ที่ 2 กำหนด เป็นตัวแปร ย่อยให้ export 
 * ตัวแปรที่รับ require ต้อง เรียก หลัง dot . เป็น method หรือ property
 *  */ 
// module.exports.name = name;
// module.exports.hello = hello;
// module.exports.sum = sum;
// module.exports.multiply = multiply;

/** แบบ ที่ 2.1 กำหนด เป็นตัวแปร ย่อยให้ export  แบบ กำหนดเป็น object
 *  */ 
module.exports = {name,hello,sum,multiply};