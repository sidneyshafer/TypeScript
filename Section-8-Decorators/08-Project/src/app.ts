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
        console.log('Rendering template...');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

// @Logger
// Adding Multiple Decorators - runs bottom -> up. WithTemplate executes first, then Logger, and so on.
@Logger('LOGGING - PERSON') // Need to execute with decorator factories
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Sidney';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();
// console.log(person);

// Diving into Property Decorators
function Log(target: any, propertyName: string) {
    console.log('Property Decorator');
    console.log(target, propertyName);
}

class Product {
    @Log
    title: string;
    private _price: number;

    set price(val: number) {
        if(val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid number assignment. Price should be positive.');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    getPriceWithTax(tax: number) {
        return this.price * (1 + tax);
    }
}