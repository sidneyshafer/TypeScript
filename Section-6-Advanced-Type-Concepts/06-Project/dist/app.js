"use strict";
var _a;
const e1 = {
    name: 'Sidney',
    privileges: ['create', 'delete'],
    startDate: new Date()
};
function add(a, b) {
    // Type Guards
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
// const result = add('Sidney', 'Shafer') as string; // Can use Type Casting (over function overload)
const result = add('Sidney', 'Shafer');
result.split(' ');
// Optional Chaining
const fetchedUserData = {
    id: 'u1',
    name: 'Sidney',
    job: { title: 'CEO', description: 'My company' }
};
// console.log(fetchedUserData.job.title && fetchedUserData.job.title); // JS way of checking if property exists
// TypeScript way of checking if property exists - using optional chaining operator (?)
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
// Nullish Coalescing - double question mark (null or undefined); Not empty string or zero
const userInput = null;
// const userInput = '';
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT';
console.log(storedData);
function printEmployeeInformation(emp) {
    console.log('Name: ' + emp.name);
    // More on Type Guards
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}
printEmployeeInformation(e1);
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // if('loadCargo' in vehicle) {
    //     vehicle.loadCargo(1000);
    // }
    // Type Guards - Using instanceOf
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving with speed: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 20 });
// Type Casting
//const paragraph = document.querySelector('p'); // TypeScript infers paragraph element type (or null)
const paragraphEl = document.getElementById('message-output'); // TypeScript infers HTML element (or null)
//const userInputEl = <HTMLInputElement>document.getElementById('user-input')!; // '!' - tell TypeScript it will not be null; define element Type
const userInputEl = document.getElementById('user-input'); // Same as above; cast type to specific HTML element type
userInputEl.value = 'Hello World!';
const errorBag = {
    email: 'Not a valid email.',
    username: 'Must start with an uppercase character',
};
