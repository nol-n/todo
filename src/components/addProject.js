import renderProjects from "./renderProjects.js";
import project from '../models/project.js';
import projects from '../models/projects.js';
import { addAction } from "./notifications.js";

function addProject(projectName) {
    addAction(`${projectName} project added.`)
    if (projectName) {
        const newProject = project(projectName);
        projects.addProject(newProject);
        renderProjects(projects);
    }
}

function addProjectInput() {
    const projectsContainer = document.querySelector("#projects-container");
    const addProjectButton = document.querySelector("#add-project");

    addProjectButton.style.display = 'none';

    const projectIcon = document.createElement("span");
    projectIcon.className = "project-icon material-symbols-outlined";
    projectIcon.textContent = 'tag';
    projectIcon.setAttribute("aria-label", "Project Icon");

    const projectInput = document.createElement("input");
    projectInput.type = "text";
    projectInput.id = "new-project-input";
    projectInput.placeholder = "Enter project name";

    let handled = false;

    const handleInput = (event) => {
        if (!handled) {
            let projectName = event.target.value.trim();
            if (projectName) {
                addProject(projectName);
            }
            projectsContainer.removeChild(wrapperDiv);
            addProjectButton.style.display = "flex";
            handled = true;
        }
    };

    projectInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleInput(event);
        }
    });

    projectInput.addEventListener("blur", function (event) {
        //had to add a slight delay otherwise both events get triggered when enter is pressed
        setTimeout(() => handleInput(event), 0);
    });

    const wrapperDiv = document.createElement("div");
    wrapperDiv.className = "project-input-wrapper";
    wrapperDiv.appendChild(projectIcon);
    wrapperDiv.appendChild(projectInput);

    projectsContainer.insertBefore(wrapperDiv, addProjectButton);
    projectInput.focus();
}

export default addProjectInput;