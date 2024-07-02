import { renderItems } from "./renderItems.js";

function editItem(project, itemIndex) {
    const items = project.getItems();
    const item = items[itemIndex];

    const itemDiv = document.querySelector(`.item-div[data-index="${itemIndex}"]`);

    const actionsSpan = document.querySelector(`.item-div[data-index="${itemIndex} .actions-span"]`);
    itemDiv.innerHTML = `
        <input type="text" class="edit-title" value="${item.title}">
        <input type="text" class="edit-desc" value="${item.desc}">
        <input type="date" class="edit-dueDate" value="${item.dueDate}">
        <select class="edit-priority">
            <option value="low" ${item.priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${item.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${item.priority === 'High' ? 'selected' : ''}>High</option>
        </select>
        <div id="actions">
        <span class="save-item material-symbols-outlined">save</span>
        <span class="cancel-edit material-symbols-outlined">cancel</span>
        </div>
    `;

    // event listeners
    itemDiv.querySelector('.save-item').addEventListener('click', () => saveEdit(project, itemIndex));
    itemDiv.querySelector('.cancel-edit').addEventListener('click', () => renderItems(project));
}

function saveEdit(project, itemIndex) {
    const items = project.getItems();
    const item = items[itemIndex];

    const itemDiv = document.querySelector(`.item-div[data-index="${itemIndex}"]`);

    // Get the edited values
    const editedTitle = itemDiv.querySelector('.edit-title').value;
    const editedDesc = itemDiv.querySelector('.edit-desc').value;
    const editedDueDate = itemDiv.querySelector('.edit-dueDate').value;
    const editedPriority = itemDiv.querySelector('.edit-priority').value;

    // Update the item with the edited values
    item.edit('title', editedTitle);
    item.edit('desc', editedDesc);
    item.edit('dueDate', editedDueDate);
    item.edit('priority', editedPriority);

    // Re-render the items
    renderItems(project);
}


export { editItem, saveEdit };