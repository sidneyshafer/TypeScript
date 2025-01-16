interface Person {
    name: string;
    age: number;

    greet(text?: string): void;
}

let user1: Person;

user1 = {
    name: 'Sidney',
    age: 20,
    greet(text: string  = 'Hello, my name is') {
        console.log(text + ' ' + this.name);
    }
};

// user1.greet();
// user1.greet('Greetings! My name is');

interface Named {
    //name: string;
    readonly name?: string;
    outputName?: string; // Optional Properties
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class User implements Greetable {
    name?: string;
    age: number;

    constructor(a: number, n?: string) {
        if(n) {
            this.name = n;
        }
        this.age = a;
    }

    greet(phrase: string): void {
        console.log(phrase + ' ' + this.name);
    }
}

const user2 = new User(20, 'Sidney');
//user2.greet('Hello! I am');

// Interfaces as Function Types
// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
};

//console.log(add(2, 4));