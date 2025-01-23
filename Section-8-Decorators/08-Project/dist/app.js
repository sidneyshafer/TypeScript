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
function WithTemplate(template, hookId) {
    return function (constructor) {
        console.log('Rendering template...');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1').textContent = p.name;
        }
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
// console.log(person);
// Diving into Property Decorators
function Log(target, propertyName) {
    console.log('Property Decorator');
    console.log(target, propertyName);
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
