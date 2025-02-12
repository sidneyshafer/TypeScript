import { Component } from "./base-component.js";
import { Validate, validate } from "../util/validation.js";
import { projectState } from "../state/project-state.js";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    titleErrorEl: HTMLElement;
    descErrorEl: HTMLElement;
    peopleErrorEl: HTMLElement;

    constructor() {
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

    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            
            projectState.addProject(title, desc, people);
            this.clearInputs();
            this.clearErrors();
        }
    }
}