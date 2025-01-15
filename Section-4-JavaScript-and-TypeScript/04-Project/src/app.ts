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

// Arrow Functions
const addNum = (a: number, b: number) => {
    return a + b;
};
// only one expression -> const addNum = (a: number, b: number) => a + b;

console.log(addNum(5, 6));

//const printOutput = (output: string | number) => console.log(output);
const printOutput: (a: number | string) => void = output => console.log(output);
printOutput(userName);

const button = document.querySelector('button');

if(button) {
    button.addEventListener('click', event => console.log(event));
}

// Default Function Parameters
// - default params must be last in the list
const addNum2 = (a: number, b: number = 1) => a + b;
printOutput(addNum2(7));

// The Spread Operator (...)
const hobbies = ['Coding', 'Sports', 'Cooking'];
const activeHobbies = ['Reading'];

activeHobbies.push(...hobbies);
//console.log(activeHobbies);

const person = {
    lastName: 'Shafer',
    birthday: '03/30/2004'
};

const copy = {...person};
//console.log(copy);

// Rest Parameters
const addAll = (...args: number[]) => {
    return args.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

const addedNumbers = addAll(5, 10, 2, 3.7);
//console.log(addedNumbers);

// Array & Object Destructuring
const [hobby1, hobby2, ...remaining] = hobbies;
//console.log(hobby1, remaining, hobbies);

const { lastName: user, birthday } = person;
//console.log(user, birthday, person);