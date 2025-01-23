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

// function WithTemplate(template: string, hookId: string) {
//     return function(constructor: any) {
//         console.log('Rendering template...');
//         const hookEl = document.getElementById(hookId);
//         const p = new constructor();
//         if (hookEl) {
//             hookEl.innerHTML = template;
//             hookEl.querySelector('h1')!.textContent = p.name;
//         }
//     };
// }

// Returning a Class in a Class Decorator
function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function<T extends {new(...args: any[]): {name: string}} >(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template...');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    };
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
console.log(person);

// Diving into Property Decorators - receives 2 arguments
function Log(target: any, propertyName: string) {
    console.log('Property Decorator');
    console.log(target, propertyName);
}

// Working with Accessor Decorators - receives 3 arguments
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Working with Method Decorators - receives 3 arguments
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// Working with Parameter Decorators - receives 3 arguments
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
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

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this.price * (1 + tax);
    }
}