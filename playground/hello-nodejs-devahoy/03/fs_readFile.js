const fs = require('fs');

console.log("Hello");

fs.readFile('data.txt',(err,data)=>{ //data คือ ตัวแปรที่ส่งออกมาจาก  readFile
    console.log('data 1 \n /n',data); //ไม่ได้ใส่ encoding จะออกมาเป็น byte เลขฐาน 16
});

fs.readFile('data.txt','utf-8',(err,data)=>{
    console.log('data 2 \n',data);
});

console.log('------line--------------------');

/** Test  Non Block I/O */
console.log('-----Start -------------');
fs.readFile('data.txt','utf-8',(err,data)=>{
    console.log('data 3 >>>>> \n',data);
});

fs.readFile('data.txt','utf-8',(err,data)=>{
    console.log('data 4 >>>>> \n',data);
});

console.log('-----End -------------');


/**
 * readFile เป็น non block หรือ async จะอ่านเสร็จ ก่อน หรือ หลัง คำสั่งต่อไป ก็ได้
 * มี callback เอาไว้ ทำหลังทำงานเสร็จ
 */
