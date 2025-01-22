"use strict";
// Built-in Generics
// const names = ['Sidney', 'Allie'];
const names = []; // sames as 'string[]'
// names[0].split(' ');
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
// Creating a Generic Function & Working with constraints
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Sidney' }, { age: 20 });
// console.log(mergedObj.name, mergedObj.age);
// console.log(mergedObj);
