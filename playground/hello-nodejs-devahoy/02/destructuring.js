const player = {
    name: 'Terathon',
    club: 'Chang'
}
console.log(player);

// // const {name,club} = player // ชื่อต้องเหมือนกัน
// // console.log(name,club);

// const {name,club,} = player // สลับตำแหน่งได้ แต่ชื่อต้องเหมือนกัน
// console.log(name,club);

// ahoy บอก แก้ตอน destruturing ได้ แต่ ลองแล้ว ไม่ได้ 
let myCustomName = "Chapui";
const { name : 'myCustomName', club } = player

console.log(name, club);

  