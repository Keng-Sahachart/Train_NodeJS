const fs = require('fs');
//var dt = new Date.now();
var dt = new Date.now();
fs.writeFile('newData.txt','Text in file->' + dt,(err,data)=>{
    console.log('file save');
})