import { editItem } from "./editItem.js"
import { toggleComplete } from "./completeItem.js"

function renderItems(project) {
    const itemsDiv = document.querySelector("#items");
    const completedItemsDiv = document.querySelector("#completed-items");

    itemsDiv.innerHTML = '';
    completedItemsDiv.innerHTML = '';

    const projectHeader = document.querySelector("#project-items-header h3");
    projectHeader.innerHTML = '';
    projectHeader.textContent = (`${project.name} Tasks`);

    project.getItems().forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item-div";
        itemDiv.dataset.index = index;

        const titleSpan = document.createElement("span");
        titleSpan.className = "title-span";
        titleSpan.textContent = item.title;
        itemDiv.appendChild(titleSpan);

        const descSpan = document.createElement("span");
        descSpan.className = "desc-span";
        descSpan.textContent = item.desc;
        itemDiv.appendChild(descSpan);

        const dueDateSpan = document.createElement("span");
        dueDateSpan.className = "due-date-span";
        dueDateSpan.textContent = item.dueDate;
        itemDiv.appendChild(dueDateSpan);

        const prioritySpan = document.createElement("span");
        prioritySpan.className = "priority-span";
        prioritySpan.textContent = item.priority;
        itemDiv.appendChild(prioritySpan);

        const actionsSpan = document.createElement("span");
        actionsSpan.className = "actions-span";

        const completeIcon = document.createElement("span");
        completeIcon.className = "complete-icon material-symbols-outlined";
        completeIcon.textContent = 'task_alt';
        completeIcon.addEventListener('click', () => {
            toggleComplete(project, index);
        });
        actionsSpan.appendChild(completeIcon);

        const editIcon = document.createElement("span");
        editIcon.className = "edit-icon material-symbols-outlined";
        editIcon.textContent = "edit";
        editIcon.addEventListener("click", () => editItem(project, index));
        actionsSpan.appendChild(editIcon);

        itemDiv.appendChild(actionsSpan);

        if (item.complete) {
            console.log(itemDiv);
            completedItemsDiv.appendChild(itemDiv);
        } else {
            itemsDiv.appendChild(itemDiv);
        }

    });
}

function selectedProject(projectElement, project) {
    const previouslySelected = document.querySelector(".project.selected")
    if (previouslySelected) {
        previouslySelected.classList.remove("selected");
    }

    projectElement.classList.add("selected");
    renderItems(project);
}

export { renderItems, selectedProject };