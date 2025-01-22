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
// Another Generic Function
function countAndPrint(element) {
    let description = 'Returned no value.';
    if (element.length > 0) {
        description = 'Returned ' + element.length + ' elements.';
    }
    return [element, description];
}
// console.log(countAndPrint('Hi there!'));
console.log(countAndPrint([]));
let number;
number = {
    length: 10
};
//console.log(countAndPrint(number));
// The "keyOf" constraint
function extractAndConvert(obj, key) {
    return obj[key];
}
console.log(extractAndConvert({ name: 'Sidney' }, 'name'));
