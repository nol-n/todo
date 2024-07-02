import { renderItems } from "./renderItems.js";

function toggleComplete(project, itemIndex) {
    const items = project.getItems();
    const item = items[itemIndex];

    item.complete = !item.complete;
    console.log(`${item.title} - ${item.complete}`);
    renderItems(project);
}

export { toggleComplete };