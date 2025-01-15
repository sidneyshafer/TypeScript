// const - cannot be re-assigned/changed
const userName = 'Sidney';
//userName = 'Shafer';

// let - can be re-assigned/changed
let age = 20;
age = 10;

// var - limited to global or function scope; better to use let with block scope
//let result;
function add(a: number, b: number) {
    let result;
    result = a + b;
    return result;
}
//console.log(result);

if(age > 30) {
    //var isOld = true;
    let isOld = true; // block scope
}
//console.log(isOld);