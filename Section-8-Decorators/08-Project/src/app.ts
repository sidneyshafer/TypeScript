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

// Building More Decorators
// function WithTemplate(template: string, hookId: string) {
//     return function(_: Function) {
//         const hookEl = document.getElementById(hookId);
//         if (hookEl) {
//             hookEl.innerHTML = template;
//         }
//     }
// }

function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

// @Logger
// @Logger('LOGGING - PERSON') // Need to execute with decorator factories
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Sidney';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();
console.log(person);