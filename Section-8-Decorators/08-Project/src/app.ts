// Class Decorators
// function Logger(target: Function) {
//     console.log('Logging...');
//     console.log(target);
// }

// Working with Decorator Factories
function Logger(logString: string) {
    return function(target: Function) {
        //console.log('Logging...');
        console.log(logString);
        console.log(target);
    }
}

// @Logger
@Logger('LOGGING - PERSON') // Need to execute with decorator factories
class Person {
    name = 'Sidney';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();
console.log(person);