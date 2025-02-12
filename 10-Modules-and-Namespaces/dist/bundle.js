"use strict";
var App;
(function (App) {
    // Component Base Class
    class Component {
        constructor(templateId, hostElId, insertAtStart, newElId) {
            this.templateEl = document.getElementById(templateId);
            this.hostEl = document.getElementById(hostElId);
            const importedNode = document.importNode(this.templateEl.content, true);
            this.element = importedNode.firstElementChild;
            if (newElId) {
                this.element.id = newElId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.hostEl.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
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
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    // Project State Management
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
        addProject(title, description, numbOfPeople) {
            const newProject = new App.Project(Math.random.toString(), title, description, numbOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />
var App;
(function (App) {
    // ProjectInput Class
    class ProjectInput extends App.Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputEl = this.element.querySelector('#title');
            this.descInputEl = this.element.querySelector('#description');
            this.peopleInputEl = this.element.querySelector('#people');
            this.titleErrorEl = this.element.querySelector('#title-error');
            this.descErrorEl = this.element.querySelector('#description-error');
            this.peopleErrorEl = this.element.querySelector('#people-error');
            this.configure();
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
            const [isTitleValid, titleError] = App.validate(titleValidate);
            const [isDescValid, descError] = App.validate(descValidate);
            const [isPeopleValid, peopleError] = App.validate(peopleValidate);
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
        configure() {
            this.element.addEventListener('submit', this.submitHandler.bind(this));
        }
        renderContent() { }
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
                App.projectState.addProject(title, desc, people);
                // console.log(title, desc, people);
                this.clearInputs();
                this.clearErrors();
            }
        }
    }
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../interfaces/drag-drop.ts" />
var App;
(function (App) {
    // ProjectItem Class
    class ProjectItem extends App.Component {
        get persons() {
            if (this.project.people === 1) {
                return '1 person';
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) { }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
            this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.persons + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../interfaces/drag-drop.ts" />
var App;
(function (App) {
    // ProjectList Class
    class ProjectList extends App.Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-project-list`);
            listEl.innerHTML = '';
            for (const item of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector('ul').id, item);
            }
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData('text/plain');
            const prjStatus = this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished;
            App.projectState.moveProject(prjId, prjStatus);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
            this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
            this.element.addEventListener('drop', this.dropHandler.bind(this));
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    return prj.status == App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
        }
    }
    App.ProjectList = ProjectList;
})(App || (App = {}));
// Import Interfaces
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList('active');
    new App.ProjectList('finished');
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map