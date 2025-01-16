"use strict";
let user1;
user1 = {
    name: 'Sidney',
    age: 20,
    greet(text = 'Hello, my name is') {
        console.log(text + ' ' + this.name);
    }
};
class User {
    constructor(n, a) {
        this.name = n;
        this.age = a;
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
const user2 = new User('Sidney', 20);
user2.greet('Hello! I am');
