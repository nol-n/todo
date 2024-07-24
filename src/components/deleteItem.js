import { addAction } from "./notifications.js";

function deleteItem(project, item) {
    addAction(`${item.title} task deleted from ${project.name} project.`);
    project.removeItem(item);
}

export { deleteItem };