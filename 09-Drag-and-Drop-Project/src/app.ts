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

// Project State Management
class ProjectState {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor() {

    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numbOfPeople: number) {
        const newProject = {
            id :Math.random.toString(),
            title: title,
            description: description,
            people: numbOfPeople
        };
        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validate {
    value?: string | number;
    required?: boolean;
    minLength?: number
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validateInput: Validate): [boolean, string] {
    let isValid = true;
    let errorStr = '';

    if (validateInput.required) {
        isValid = isValid && validateInput.value?.toString().trim().length !== 0;
        if(!isValid) {
            errorStr = 'Required field'
        }
    }
    if (validateInput.minLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length > validateInput.minLength;
        if(!isValid) {
            errorStr = 'Character length must be greater than ' + validateInput.minLength;
        }
    }
    if (validateInput.maxLength != null && typeof validateInput.value === 'string') {
        isValid = isValid && validateInput.value.length < validateInput.maxLength;
        if(!isValid) {
            errorStr = 'Character length must be less than ' + validateInput.maxLength;
        }
    }
    if (validateInput.min != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value > validateInput.min;
        if(!isValid) {
            errorStr = 'Values must be greater than ' + validateInput.min;
        }
    }
    if (validateInput.max != null && typeof validateInput.value === 'number') {
        isValid = isValid && validateInput.value < validateInput.max;
        if(!isValid) {
            errorStr = 'Values must be less than ' + validateInput.max;
        }
    }
    return [isValid, errorStr];
}

// ProjectList Class
class ProjectList {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    element: HTMLElement;
    private assignedProjects: any[];

    constructor(private type: 'active' | 'finished') {
        this.templateEl = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        this.assignedProjects = [];

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
        for (const item of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = item.title;
            listEl.appendChild(listItem);
        }
    }

    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostEl.insertAdjacentElement('beforeend', this.element);
    }
}

// ProjectInput Class
class ProjectInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    element: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    titleErrorEl: HTMLElement;
    descErrorEl: HTMLElement;
    peopleErrorEl: HTMLElement;

    constructor() {
        
        // const tempEl = document.getElementById('project-input');
        // if (tempEl) {
        //     this.templateEl = tempEl;
        // }

        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;

        this.titleErrorEl = this.element.querySelector('#title-error') as HTMLElement;
        this.descErrorEl = this.element.querySelector('#description-error') as HTMLElement;
        this.peopleErrorEl = this.element.querySelector('#people-error') as HTMLElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputEl.value;
        const enteredDesc = this.descInputEl.value;
        const enteredPeople = this.peopleInputEl.value;

        const titleValidate: Validate = {
            value: enteredTitle,
            required: true
        };
        const descValidate: Validate = {
            value: enteredDesc,
            required: true,
            minLength: 5
        };
        const peopleValidate: Validate = {
            value: +enteredPeople,
            required: true,
            min: 0,
            max: 5
        };

        const [isTitleValid, titleError] = validate(titleValidate);
        const [isDescValid, descError] = validate(descValidate);
        const [isPeopleValid, peopleError] = validate(peopleValidate);

        // Checking if no input is empty
        if ( 
            !isTitleValid || 
            !isDescValid || 
            !isPeopleValid
        ) {
            this.titleErrorEl.innerText = titleError;
            this.descErrorEl.innerText = descError;
            this.peopleErrorEl.innerText = peopleError;
            return;
        } else {
            return [enteredTitle, enteredDesc, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputEl.value = '';
        this.descInputEl.value = '';
        this.peopleInputEl.value = '';
    }

    private clearErrors() {
        this.titleErrorEl.innerText = '';
        this.descErrorEl.innerText = '';
        this.peopleErrorEl.innerText = '';
    }

    // @autobind
    private submitHandler(event: Event) {
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

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    private attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}

const projectInput  = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');