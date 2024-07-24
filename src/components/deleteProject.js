import { addAction } from "./notifications.js";

function deleteProject(projects, project) {
    addAction(`${project.name} project deleted.`)
    projects.removeProject(project);
}

export { deleteProject };