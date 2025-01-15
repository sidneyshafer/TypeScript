class Department {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    describe(this: Department) {
        console.log('Department: ' + this.name);
    }
}

const engineering = new Department('Engineering');
//console.log(engineering);
engineering.describe();

const copy = { name: 'COPY', describe: engineering.describe };
copy.describe();