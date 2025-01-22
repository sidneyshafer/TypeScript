// Built-in Generics
// const names = ['Sidney', 'Allie'];
const names: Array<string> = []; // sames as 'string[]'
// names[0].split(' ');

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});

promise.then(data => {
    data.split(' ');
});

// Creating a Generic Function & Working with constraints
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Sidney'}, {age: 20});

// console.log(mergedObj.name, mergedObj.age);
// console.log(mergedObj);

interface Lengthy {
    length: number;
}

// Another Generic Function
function countAndPrint<T extends Lengthy>(element: T): [T, string] {
    let description = 'Returned no value.';
    if(element.length > 0) {
        description = 'Returned ' + element.length + ' elements.';
    }
    return [element, description];
}

// console.log(countAndPrint('Hi there!'));
// console.log(countAndPrint([]));

let number: Lengthy;
number = {
    length: 10
}

//console.log(countAndPrint(number));

// The "keyOf" constraint
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

// console.log(extractAndConvert({name: 'Sidney'}, 'name'));