const fs = require('fs');
//var dt = new Date.now();
var dt = new Date().format("%Y-%m-%d");
fs.writeFile('newData.txt','Text in file->' + dt,(err,data)=>{
    console.log('file save');
})