import { selectedProject } from './renderItems.js';

function renderProjects(allProjects) {
    const projectsList = document.querySelector("#projects-list");
    projectsList.innerHTML = '';

    allProjects.getProjects().forEach((project) => {
        const projectBullet = document.createElement("li");
        projectBullet.className = "project";
        projectBullet.textContent = project.name;
        //add event listener to add class "selected" to relevant project
        projectBullet.addEventListener("click", () => {
            selectedProject(projectBullet, project);
        });
        projectsList.appendChild(projectBullet);
    });
}

export default renderProjects;