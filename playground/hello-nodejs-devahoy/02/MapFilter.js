// map เป็นการ loop array เช่น
const items = [
    {
        id: 1,
        name: 'Name_ 1'
    },
    {
        id: 2,
        name: 'Name_ 2'
    },
    {
        id: 1,
        name: 'Name_ 3'
    }
]

//return กลับมาเป็น array ก้อนใหม่ 
const result = items.map(function (data) {
    return `${data.id} : ${data.name}`;
});

console.log(result);

//  ณ loop นั้น ถ้า true ค่า จะ return 
const resultfilter = items.filter(function (data) {
    return data.id === 1;
})
console.log(resultfilter);

/**
 *  การ remove null,undefined
 */
const myArray = [1, 2, null,  3,undefined, 4, 5, 6];

const newValue = myArray.filter((data) => {
    return data;
})
console.log(newValue);

const newValue1 = myArray.filter(data => data)
console.log(newValue1);
