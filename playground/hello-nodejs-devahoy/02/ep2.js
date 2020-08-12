/**
 * https://devahoy.com/blog/2020/01/web-development-with-nodejs-mongodb-part2/
 * workshop เฉพาะ ที่เป็น การเขียน แปลกๆ
 */
/**
 *foreach array
 */
let numbers=[10,20,30,40,50];

//  n คล้ายๆกับ (int n in numbers) ใน vb c#
console.log("numbers.forEach((n)=>");
numbers.forEach((n)=>{ 
    console.log(n);
})
//-----------
console.log("count = function(n)=>");
const count = function(n){
    console.log(n);
}
numbers.forEach(count);  
/** ปรากฏว่า ไม่ใช่การ count แต่เป็นการ เรียก ฟังก์ชั่นธรรมดา
 * มันจะส่งค่าเข้าไปใน function เอง 
 */

 /**
  * declare object and maintain value and method
  * 
  */

  var user={name:"Xerzis"};
  user.lastname ="Kaizer";
  user.print = (str)=>{
      console.log(str);
  }

  console.log("var user=>");
  console.log(user);
  console.log(user.print('Hello'));// ออกมาเป็น undefine เพราะมันเป็น function ไม่ได้ return ค่า
  user.print('Hello')
  