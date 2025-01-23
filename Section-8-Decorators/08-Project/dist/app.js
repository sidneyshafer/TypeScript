"use strict";
// Class Decorators
// function Logger(target: Function) {
//     console.log('Logging...');
//     console.log(target);
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Working with Decorator Factories
function Logger(logString) {
    return function (target) {
        //console.log('Logging...');
        console.log(logString);
        console.log(target);
    };
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
function WithTemplate(template, hookId) {
    console.log('TEMPLATE FACTORY');
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log('Rendering template...');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
// @Logger
// Adding Multiple Decorators - runs bottom -> up. WithTemplate executes first, then Logger, and so on.
let Person = class Person {
    constructor() {
        this.name = 'Sidney';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger('LOGGING - PERSON') // Need to execute with decorator factories
    ,
    WithTemplate('<h1>My Person Object</h1>', 'app')
], Person);
const person = new Person();
console.log(person);
// Diving into Property Decorators - receives 2 arguments
function Log(target, propertyName) {
    console.log('Property Decorator');
    console.log(target, propertyName);
}
// Working with Accessor Decorators - receives 3 arguments
function Log2(target, name, descriptor) {
    console.log('Accessor Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
// Working with Method Decorators - receives 3 arguments
function Log3(target, name, descriptor) {
    console.log('Method Decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
// Working with Parameter Decorators - receives 3 arguments
function Log4(target, name, position) {
    console.log('Parameter Decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid number assignment. Price should be positive.');
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this.price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
// Creating an "Autobind" Decorator
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Print {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Print.prototype, "showMessage", null);
const p = new Print();
const button = document.querySelector('button');
// button?.addEventListener('click', p.showMessage.bind(p)); // Common work around using "bind()"
button === null || button === void 0 ? void 0 : button.addEventListener('click', p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again.');
        return;
    }
    console.log(createdCourse);
});
