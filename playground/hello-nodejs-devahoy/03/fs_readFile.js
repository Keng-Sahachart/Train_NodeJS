const fs = require('fs');

console.log("Hello");

fs.readFile('data.txt',(err,data)=>{
    console.log('data 1 \n /n',data);
});

fs.readFile('data.txt','utf-8',(err,data)=>{
    console.log('data 2 \n',data);
});

console.log('--------------------------');

/** Test  Non Block I/O */
console.log('-----Start -------------');
fs.readFile('data.txt','utf-8',(err,data)=>{
    console.log('data 3 >>>>> \n',data);
});

fs.readFile('data.txt','utf-8',(err,data)=>{
    console.log('data 4 >>>>> \n',data);
});

console.log('-----End -------------');