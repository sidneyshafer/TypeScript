"use strict";
// autobind decorator
/*
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
*/
// Project Type - Using Class & Enum
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
// Project State Management
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, numbOfPeople) {
        // const newProject = {
        //     id :Math.random.toString(),
        //     title: title,
        //     description: description,
        //     people: numbOfPeople
        // };
        const newProject = new Project(Math.random.toString(), title, description, numbOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(validateInput) {
    var _a;
    let isValid = true;
    let errorStr = '';
    if (validateInput.required) {
        isValid = isValid && ((_a = validateInput.value) === null || _a === void 0 ? void 0 : _a.toString().trim().length) !== 0;
        if (!isValid) {
            errorStr = 'Required field';
        }
    }
    if (validateInput.minLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length > validateInput.minLength;
        if (!isValid) {
            errorStr = 'Character length must be greater than ' + validateInput.minLength;
        }
    }
    if (validateInput.maxLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length < validateInput.maxLength;
        if (!isValid) {
            errorStr = 'Character length must be less than ' + validateInput.maxLength;
        }
    }
    if (validateInput.min != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value > validateInput.min;
        if (!isValid) {
            errorStr = 'Values must be greater than ' + validateInput.min;
        }
    }
    if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value < validateInput.max;
        if (!isValid) {
            errorStr = 'Values must be less than ' + validateInput.max;
        }
    }
    return [isValid, errorStr];
}
// ProjectList Class
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateEl = document.getElementById('project-list');
        this.hostEl = document.getElementById('app');
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`);
        for (const item of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = item.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        this.hostEl.insertAdjacentElement('beforeend', this.element);
    }
}
// ProjectInput Class
class ProjectInput {
    constructor() {
        // const tempEl = document.getElementById('project-input');
        // if (tempEl) {
        //     this.templateEl = tempEl;
        // }
        this.templateEl = document.getElementById('project-input');
        this.hostEl = document.getElementById('app');
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputEl = this.element.querySelector('#title');
        this.descInputEl = this.element.querySelector('#description');
        this.peopleInputEl = this.element.querySelector('#people');
        this.titleErrorEl = this.element.querySelector('#title-error');
        this.descErrorEl = this.element.querySelector('#description-error');
        this.peopleErrorEl = this.element.querySelector('#people-error');
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputEl.value;
        const enteredDesc = this.descInputEl.value;
        const enteredPeople = this.peopleInputEl.value;
        const titleValidate = {
            value: enteredTitle,
            required: true
        };
        const descValidate = {
            value: enteredDesc,
            required: true,
            minLength: 5
        };
        const peopleValidate = {
            value: +enteredPeople,
            required: true,
            min: 0,
            max: 5
        };
        const [isTitleValid, titleError] = validate(titleValidate);
        const [isDescValid, descError] = validate(descValidate);
        const [isPeopleValid, peopleError] = validate(peopleValidate);
        // Checking if no input is empty
        if (!isTitleValid ||
            !isDescValid ||
            !isPeopleValid) {
            this.titleErrorEl.innerText = titleError;
            this.descErrorEl.innerText = descError;
            this.peopleErrorEl.innerText = peopleError;
            return;
        }
        else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputEl.value = '';
        this.descInputEl.value = '';
        this.peopleInputEl.value = '';
    }
    clearErrors() {
        this.titleErrorEl.innerText = '';
        this.descErrorEl.innerText = '';
        this.peopleErrorEl.innerText = '';
    }
    // @autobind
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            // console.log(title, desc, people);
            this.clearInputs();
            this.clearErrors();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
