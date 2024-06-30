import toDoItem from './models/todoitem.js';
import project from './models/project.js';
import projects from './models/projects.js';

const allProjects = projects();

function renderItems(project) {
    const itemsDiv = document.querySelector("#items");
    itemsDiv.innerHTML = '';

    project.getItems().forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item-div";

        const titleSpan = document.createElement("span");
        titleSpan.className = "title-span";
        titleSpan.textContent = item.title;
        itemDiv.appendChild(titleSpan);

        const descSpan = document.createElement("span");
        descSpan.className = "desc-span";
        descSpan.textContent = item.desc;
        itemDiv.appendChild(descSpan);

        const dueDateSpan = document.createElement("span");
        dueDateSpan.className = "due-date-span";
        dueDateSpan.textContent = item.dueDate;
        itemDiv.appendChild(dueDateSpan);

        const prioritySpan = document.createElement("span");
        prioritySpan.className = "priority-span";
        prioritySpan.textContent = item.priority;
        itemDiv.appendChild(prioritySpan);

        const completeSpan = document.createElement("span");
        completeSpan.className = "complete-span";
        completeSpan.textContent = item.complete;
        itemDiv.appendChild(completeSpan);

        itemsDiv.appendChild(itemDiv);

    });
}

function renderProjects() {
    const projectsList = document.querySelector("#projects-list");
    projectsList.innerHTML = '';

    allProjects.getProjects().forEach((project) => {
        const projectBullet = document.createElement("li");
        projectBullet.className = "project";
        projectBullet.textContent = project.name;
        projectBullet.addEventListener("click", () => {
            selectedProject(projectBullet, project);
        });
        projectsList.appendChild(projectBullet);
    });
}

function selectedProject(projectElement, project) {
    const previouslySelected = document.querySelector(".project.selected")
    if (previouslySelected) {
        projectElement.classList.remove("selected");
    }

    projectElement.classList.add("selected");
    renderItems(project);
}

function addProject(projectName) {
    if (projectName) {
        const newProject = project(projectName);
        allProjects.addProject(newProject);
        renderProjects();
    }
}

function addProjectInput() {
    const projectsContainer = document.querySelector("#projects-container");
    const addProjectButton = document.querySelector("#add-project");

    addProjectButton.style.display = 'none';

    const projectInput = document.createElement("input");
    projectInput.type = "text";
    projectInput.id = "new-project-input";
    projectInput.placeholder = "Enter project name";

    projectInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let projectName = event.target.value.trim();
            if (projectName) {
                addProject(projectName);
                projectsContainer.removeChild(projectInput);
                addProjectButton.style.display = 'block';
            }
        }
    });

    projectInput.addEventListener("blur", function (event) {
        let projectName = event.target.value.trim();
        if (projectName) {
            addProject(projectName);
            projectsContainer.removeChild(projectInput);
            addProjectButton.style.display = 'block';
        }
    });   

    projectsContainer.insertBefore(projectInput, addProjectButton);
    projectInput.focus();
}

function addItemDialog(project) {
    const itemTitle = document.querySelector("#item-title").value.trim();
    const itemDesc = document.querySelector("#item-desc").value.trim();
    const itemDueDate = document.querySelector("#item-due-date").value.trim();
    const itemPriority = document.querySelector("#item-priority").value.trim();

    if(itemTitle && itemDesc && itemDueDate && itemPriority) {
        const newItem = toDoItem(itemTitle, itemDesc, itemDueDate, itemPriority);
        project.addItem(newItem);
        renderItems(project);
        document.querySelector("#add-item-dialog").close();
    }
}




export { renderProjects, renderItems, addProject, addProjectInput, addItemDialog };