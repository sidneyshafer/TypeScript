/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../interfaces/drag-drop.ts" />

namespace App {
    // ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

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
}