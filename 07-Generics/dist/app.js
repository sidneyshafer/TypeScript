"use strict";
// Built-in Generics
// const names = ['Sidney', 'Allie'];
const names = []; // sames as 'string[]'
// names[0].split(' ');
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
// Creating a Generic Function & Working with constraints
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Sidney' }, { age: 20 });
// Another Generic Function
function countAndPrint(element) {
    let description = 'Returned no value.';
    if (element.length > 0) {
        description = 'Returned ' + element.length + ' elements.';
    }
    return [element, description];
}
// console.log(countAndPrint('Hi there!'));
// console.log(countAndPrint([]));
let number;
number = {
    length: 10
};
//console.log(countAndPrint(number));
// The "keyOf" constraint
function extractAndConvert(obj, key) {
    return obj[key];
}
// console.log(extractAndConvert({name: 'Sidney'}, 'name'));
// Generic Classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Apple');
textStorage.addItem('Orange');
textStorage.addItem('Grape');
// console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(5);
numberStorage.addItem(2);
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
// console.log(createCourseGoal(
//     'JavaScript Bootcamp 101', 
//     'A bootcamp for learning JavaScript', 
//     new Date()
// ));
const userNames = ['Sidney', 'Allie'];
names.push('Lisa');
console.log(userNames);
