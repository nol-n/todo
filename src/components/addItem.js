import toDoItem from "../models/todoitem.js";
import { renderItems } from "./renderItems.js";

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

export default addItemDialog;