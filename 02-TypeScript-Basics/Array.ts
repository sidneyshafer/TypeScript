// --------------------------------------- //
// SECTION 2 - TYPESCRIPT ARRAYS & TUPLES  //
// --------------------------------------- //

const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string] // Tuple
} = {
    name: 'Sidney',
    age: 20,
    hobbies: ['Coding', 'LEGO', 'Walking', 'Golfing'],
    role: [2, 'author']
};

//person.role.push('admin');
person.role = [0, 'admin'];

//let favoriteActivities: string[];
//favoriteActivities = 'string';

let favoriteActivities: any[];
favoriteActivities = ['Sports', 10];

console.log(person);
console.log(person.role);

for(const hobby of person.hobbies) {
    console.log(hobby);
    //console.log(hobby.toUpperCase());
}