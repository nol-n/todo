import { addAction } from "./notifications.js";

function deleteItem(project, item) {
    addAction(`${item.title} deleted from ${project.name}.`);
    project.removeItem(item);
}

export { deleteItem };