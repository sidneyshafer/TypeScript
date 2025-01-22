// Class Decorators
function Logger(target: Function) {
    console.log('Logging...');
    console.log(target);
}

@Logger
class Person {
    name = 'Sidney';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();
console.log(person);