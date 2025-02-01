abstract class Department {
    static fiscalYear = 2024;
    // private readonly id: number;
    // private name: string;
    //private employees: string[] = []; // "public" is default property
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = name;
    }

    static createEmployee(name: string) {
        return { name: name }; 
    }

    abstract describe(this: Department): void;
    // describe(this: Department) {
    //     console.log(`Department (${this.id}): ${this.name}`);
    //     // console.log('Department: ' + this.name);
    //     // console.log('ID: ' + this.id);
    // }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log('Number of employees: ' + this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    public admins: string[];
    
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log('IT Department - ID: ' + this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if(this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('Please pass in a valid value.');
        }
        this.addReport(value);
    }
    
    // constructor(id: string, private reports: string[]) {
    //     super(id, 'Accounting');
    //     this.lastReport = reports[0];
    // }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }
    
    // Singletons & Private Constructors
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('D2', []);
        return this.instance;
    }

    addReport(text: string) {
        this.reports.push(text);
        this.updateLastReport();
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(employee: string) {
        if(employee === 'Shafer') {
            return;
        }
        this.employees.push(employee);
    }

    updateLastReport() {
        this.lastReport = this.reports[0];
    }

    describe() {
        console.log('Account Department - ID: ' + this.id);
    }
}

const engineering = new ITDepartment('D1', []);

const employee1 = Department.createEmployee('Sidney');
console.log(employee1, Department.fiscalYear);

// //console.log(engineering);
// engineering.describe();

// const copy = { name: 'COPY', describe: engineering.describe };
// copy.describe();

// engineering.addEmployee('Sidney');
// engineering.addEmployee('Allie');
// engineering.printEmployeeInformation();

// const admins = ['Shafer', 'Fisk', 'Cole'];
// const IT = new ITDepartment('D2', admins);

// IT.describe();

//const accounting = new AccountingDepartment('D3', []);
const accounting = AccountingDepartment.getInstance();

// accounting.addReport('New Client Report');
// accounting.addReport('New File Report');

accounting.describe();
// accounting.printReports();

// accounting.addEmployee('Shafer');
// accounting.addEmployee('Katie');
// accounting.addEmployee('Lisa');

// accounting.printEmployeeInformation();

// //accounting.mostRecentReport = 'Year End Report';
// accounting.mostRecentReport = 'Year End Report';
// accounting.printReports();

// console.log(accounting.mostRecentReport);