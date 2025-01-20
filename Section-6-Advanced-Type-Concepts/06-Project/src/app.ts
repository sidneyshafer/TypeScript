type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// Intersection Types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Sidney',
    privileges: ['create', 'delete'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Type Guards
function add(a: Combinable, b: Combinable) {
    // Type Guards
    if(typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    // More on Type Guards
    if('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if('startDate' in emp) {
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
        console.log('Driving a truck...')
    }

    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // if('loadCargo' in vehicle) {
    //     vehicle.loadCargo(1000);
    // }
    // Type Guards - Using instanceOf
    if(vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 20});

// Type Casting

//const paragraph = document.querySelector('p'); // TypeScript infers paragraph element type (or null)
const paragraphEl = document.getElementById('message-output'); // TypeScript infers HTML element (or null)

//const userInputEl = <HTMLInputElement>document.getElementById('user-input')!; // '!' - tell TypeScript it will not be null; define element Type
const userInputEl = document.getElementById('user-input')! as HTMLInputElement; // Same as above; cast type to specific HTML element type

userInputEl.value = 'Hello World!';

// Another way of type casting
// const inputEl = document.getElementById('user-input');

// if(inputEl) {
//     (inputEl as HTMLInputElement).value = 'Hello World!';
// }

// Index Properties
// Want flexible container
interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with...' }
    //id: string; // cannot be number
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email.',
    username: 'Must start with an uppercase character',
};