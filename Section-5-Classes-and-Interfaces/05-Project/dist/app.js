"use strict";
class Department {
    constructor(n) {
        this.name = n;
    }
    describe() {
        console.log('Department: ' + this.name);
    }
}
const engineering = new Department('Engineering');
//console.log(engineering);
engineering.describe();
const copy = { name: 'COPY', describe: engineering.describe };
copy.describe();
