import _ from 'lodash';
console.log(_.shuffle([1, 2, 3]));

// declare var GLOBAL: string;
// console.log(GLOBAL);

import { Example } from './example.model';

const ex1 = new Example('Book', 12.99);
console.log(ex1.getInformation());

const items = [
    { title: 'Carpet', price: 29.99 },
    { title: 'Table', price: 32.99 },
];

const loadedItems = items.map((i) => {
    return new Example(i.title, i.price);
});
// console.log(loadedItems);

for (const i of loadedItems) {
    console.log(i.getInformation());
}

import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';

const loadedItems2 = plainToInstance(Example, items);
// console.log(loadedItems2);
for (const i of loadedItems2) {
    console.log(i.getInformation());
}

import { validate } from 'class-validator';
const newEx = new Example('', -20);
validate(newEx).then(errors => {
    if (errors.length > 0) {
        console.log('Validation Errors: ' + errors);
    } else {
        console.log(newEx.getInformation());
    }
});