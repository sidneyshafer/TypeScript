import { Component } from "./base-component.js";
import { validate } from "../util/validation.js";
import { projectState } from "../state/project-state.js";
// ProjectInput Class
export class ProjectInput extends Component {
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
    submitHandler(event) {
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
//# sourceMappingURL=project-input.js.map