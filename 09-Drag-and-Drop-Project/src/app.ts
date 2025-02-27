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

// Drag & Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// Project Type - Using Class & Enum
enum ProjectStatus { Active, Finished }

class Project {
    public id: string;
    public title: string;
    public description: string;
    public people: number;
    public status: ProjectStatus;

    constructor(
        id: string, 
        title: string, 
        description: string, 
        people: number, 
        status: ProjectStatus
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}

// Customer Listener Type
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

// Project State Management
class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    addProject(title: string, description: string, numbOfPeople: number) {
        // const newProject = {
        //     id :Math.random.toString(),
        //     title: title,
        //     description: description,
        //     people: numbOfPeople
        // };
        const newProject = new Project(
            Math.random.toString(),
            title,
            description,
            numbOfPeople,
            ProjectStatus.Active
        )
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
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

// Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;

    constructor(
        templateId: string, 
        hostElId: string, 
        insertAtStart: boolean,
        newElId?: string,
    ) {
        this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostEl = document.getElementById(hostElId)! as T;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as U;

        if (newElId) {
            this.element.id = newElId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        this.hostEl.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }
    
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {}

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    private assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
        listEl.innerHTML = '';
        for (const item of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, item);
        }
    }

    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    dropHandler(event: DragEvent): void {
        const prjId = event.dataTransfer!.getData('text/plain');
        const prjStatus = this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished; 
        projectState.moveProject(prjId, prjStatus);
    }

    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.element.addEventListener('drop', this.dropHandler.bind(this));
        
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status == ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}

// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
        super('project-input', 'app', true, 'user-input');

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;

        this.titleErrorEl = this.element.querySelector('#title-error') as HTMLElement;
        this.descErrorEl = this.element.querySelector('#description-error') as HTMLElement;
        this.peopleErrorEl = this.element.querySelector('#people-error') as HTMLElement;

        this.configure();
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

    configure(): void {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    renderContent(): void {}

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
}

const projectInput  = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');