type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// Intersection Types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Sidney',
    privileges: ['create', 'delete'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;