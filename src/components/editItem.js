import { renderItems } from "./renderItems.js";
import renderAllItems from "./renderAllItems.js";
import projects from "../models/projects.js";
import { addAction } from "./notifications.js";
import { parseISO, format } from 'date-fns';

function editItem(projectName, itemIndex, isAllItemsView = false) {
    const project = projects.getProjects().find(proj => proj.name === projectName);
    const items = project.getItems();
    const item = items[itemIndex];

    const itemDiv = document.querySelector(`.item-div[data-project-name="${projectName}"][data-index="${itemIndex}"]`);
    const formattedDate = item.dueDate ? format(parseISO(item.dueDate), 'yyyy-MM-dd') : '';

    itemDiv.innerHTML = `
        <input type="text" class="edit-title" value="${item.title}" required>
        <input type="text" class="edit-desc" value="${item.desc}" required>
        <input type="date" class="edit-dueDate" value="${formattedDate}" required>
        <select class="edit-priority">
            <option value="Low" ${item.priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${item.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${item.priority === 'High' ? 'selected' : ''}>High</option>
        </select>
        <div class="actions-span">
        <span class="save-icon material-symbols-outlined">save</span>
        <span class="cancel-icon material-symbols-outlined">cancel</span>
        </div>
    `;

    // event listeners
    itemDiv.querySelector('.save-icon').addEventListener('click', () => saveEdit(projectName, itemIndex, isAllItemsView));
    itemDiv.querySelector('.cancel-icon').addEventListener('click', () => {
        if (isAllItemsView) {
            renderAllItems(projects);
        } else {
            renderItems(project)
        }
    });
}

function saveEdit(projectName, itemIndex, isAllItemsView = false) {
    const project = projects.getProjects().find(proj => proj.name === projectName);
    const items = project.getItems();
    const item = items[itemIndex];

    const itemDiv = document.querySelector(`.item-div[data-project-name="${projectName}"][data-index="${itemIndex}"]`);

    const editedTitle = itemDiv.querySelector('.edit-title').value;
    const editedDesc = itemDiv.querySelector('.edit-desc').value;
    const editedDueDate = itemDiv.querySelector('.edit-dueDate').value;
    const editedPriority = itemDiv.querySelector('.edit-priority').value;

    if (item.title != editedTitle || item.desc != editedDesc || item.dueDate != editedDueDate || item.priority != editedPriority) {
        addAction(`${item.title} task edited in ${project.name} project.`);
    }
    
    item.edit('title', editedTitle);
    item.edit('desc', editedDesc);
    item.edit('dueDate', editedDueDate);
    item.edit('priority', editedPriority);

    console.log("Saving projects to localStorage after editing item...");
    projects.saveProjectsToLocalStorage();


    if (isAllItemsView) {
        renderAllItems(projects);
    } else {
        renderItems(project);
    }
}


export { editItem, saveEdit };