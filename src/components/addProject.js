import renderProjects from "./renderProjects.js";
import project from '../models/project.js';

function addProject(projectName, allProjects) {
    if (projectName) {
        const newProject = project(projectName);
        allProjects.addProject(newProject);
        renderProjects(allProjects);
    }
}

function addProjectInput(allProjects) {
    const projectsContainer = document.querySelector("#projects-container");
    const addProjectButton = document.querySelector("#add-project");

    addProjectButton.style.display = 'none';

    const projectInput = document.createElement("input");
    projectInput.type = "text";
    projectInput.id = "new-project-input";
    projectInput.placeholder = "Enter project name";

    let handled = false;
    
    const handleInput = (event) => {
        if (!handled) {
            let projectName = event.target.value.trim();
            if(projectName) {
                addProject(projectName, allProjects);
            }
            projectsContainer.removeChild(projectInput);
            addProjectButton.style.display = "block";
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

    projectsContainer.insertBefore(projectInput, addProjectButton);
    projectInput.focus();
}

export default addProjectInput;