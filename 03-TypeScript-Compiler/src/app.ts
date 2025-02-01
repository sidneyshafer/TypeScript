const person = "Sidney Shafer";
console.log(person);

let age: number;
age = 20;

const button = document.querySelector('button');

/*
if(button) {
    button.addEventListener('click', () => {
        console.log('Clicked!');
    });
}*/

function clickHandler(message: string) {
    console.log('Clicked! ' + message);
}

if(button) {
    button.addEventListener('click', clickHandler.bind(null, 'Welcome!'));
}