// --------------------------------------- //
// SECTION 2 - TYPESCRIPT ARRAYS & TUPLES  //
// --------------------------------------- //
var person = {
    name: 'Sidney',
    age: 20,
    hobbies: ['Coding', 'LEGO', 'Walking', 'Golfing'],
    role: [2, 'author']
};
//person.role.push('admin');
person.role = [0, 'admin'];
//let favoriteActivities: string[];
//favoriteActivities = 'string';
var favoriteActivities;
favoriteActivities = ['Sports', 10];
console.log(person);
console.log(person.role);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
    //console.log(hobby.toUpperCase());
}
