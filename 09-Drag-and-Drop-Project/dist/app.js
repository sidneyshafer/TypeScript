"use strict";
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
        this.attach();
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}
const projectInput = new ProjectInput();
