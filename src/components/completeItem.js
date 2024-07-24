import { renderItems } from "./renderItems.js";
import { addAction } from "./notifications.js";
import projects from "../models/projects.js";

function toggleComplete(project, itemIndex) {
    const items = project.getItems();
    const item = items[itemIndex];
    item.complete = !item.complete;

    item.complete ? addAction(`${item.title} in ${project.name} marked as complete.`) : addAction(`${item.title} marked as incomplete.`);
    renderItems(project);
}

export { toggleComplete };