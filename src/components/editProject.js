import renderProjects from "./renderProjects.js";
import projects from "../models/projects.js";
import { addAction } from "./notifications.js";

function editProject(project) {
    const projectHeaderDiv = document.querySelector("#project-items-header");
    const projectHeader = document.querySelector("#project-items-header h3");
    const currentProjectHeader = projectHeader.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentProjectHeader.replace(" - Tasks", "");
    input.className = "edit-project-input";

    const saveProjectName = () => {
        const newProjectName = input.value.trim();
        if (project.name != newProjectName) {
            addAction(`${project.name} project changed to ${newProjectName}.`);
        }
        
        if (newProjectName) {
            project.name = newProjectName;
            projectHeader.textContent = newProjectName + " - Tasks";
            if (document.querySelector("#completed-tasks-header").style.display === 'grid') {
                document.querySelector("#completed-tasks-header").innerHTML = `<h3>${newProjectName} - Completed Tasks</h3>`;
            }
            renderProjects(projects);
        }
        if (projectHeaderDiv.contains(input)) {
            projectHeaderDiv.replaceChild(projectHeader, input);
        }
    };

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            saveProjectName();
        }
    });

    input.addEventListener('blur', () => {
        setTimeout(saveProjectName, 100);
    });

    projectHeaderDiv.replaceChild(input, projectHeader);
    input.focus();
}

export default editProject;
