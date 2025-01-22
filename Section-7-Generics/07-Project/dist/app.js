"use strict";
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
