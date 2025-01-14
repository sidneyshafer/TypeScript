// ----------------------------- //
// SECTION 2 - TYPESCRIPT ENUMS  //
// ----------------------------- //
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
var person = {
    name: 'Sidney',
    age: 20,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};
if (person.role === Role.ADMIN) {
    console.log('is admin');
}
