// ------------------------------ //
// SECTION 2 - TYPESCRIPT OBJECTS //
// ------------------------------ //

// Regular JS Object
/*
const person = {
    name: 'Sidney',
    age: 20
};*/

/*const person: object = {
}*/

const person: {
    name: string;
    age: number;
} = {
    name: 'Sidney',
    age: 20
};

console.log(person);