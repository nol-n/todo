import { editItem } from "./editItem.js";
import { toggleComplete } from "./completeItem.js";
import { deleteItem} from "./deleteItem.js";
import { format, parseISO } from 'date-fns';

function renderAllItems(allProjects) {
    const itemsDiv = document.querySelector("#items");
    const completedItemsDiv = document.querySelector("#completed-items");
    const projectItemsHeader = document.querySelector("#project-items-header");
    const projectItemsHeaderH3 = document.querySelector("#project-items-header h3");
    
    if (projectItemsHeaderH3.textContent != "All Tasks") {
        projectItemsHeader.removeChild(document.querySelector(".edit-project-button"));
        projectItemsHeader.removeChild(document.querySelector(".delete-project-button"));
        document.querySelector("#completed-tasks-header h3").textContent = "Completed Tasks"
    }
    
    projectItemsHeaderH3.textContent = "All Tasks";

    itemsDiv.innerHTML = '';
    completedItemsDiv.innerHTML = '';

    let hasCompletedItems = false;

    allProjects.getProjects().forEach((project) => {
        project.getItems().forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item-div";
            itemDiv.dataset.projectName = project.name;
            itemDiv.dataset.index = index;

            const titleSpan = document.createElement("span");
            titleSpan.className = "title-span";
            titleSpan.textContent = item.title;
            itemDiv.appendChild(titleSpan);

            const descSpan = document.createElement("span");
            descSpan.className = "desc-span";
            descSpan.textContent = item.desc;
            itemDiv.appendChild(descSpan);

            const formattedDate = item.dueDate ? format(parseISO(item.dueDate), 'yyyy-MM-dd') : '';

            const dueDateSpan = document.createElement("span");
            dueDateSpan.className = "due-date-span";
            dueDateSpan.textContent = formattedDate;
            itemDiv.appendChild(dueDateSpan);

            const prioritySpan = document.createElement("span");
            prioritySpan.className = `priority-span ${item.priority.toLowerCase()}-priority`;
            prioritySpan.textContent = item.priority;
            itemDiv.appendChild(prioritySpan);

            const actionsSpan = document.createElement("span");
            actionsSpan.className = "actions-span";

            const completeIcon = document.createElement("span");
            completeIcon.className = "complete-icon material-symbols-outlined";
            completeIcon.textContent = 'task_alt';
            completeIcon.setAttribute("aria-label", "Mark as Complete");
            completeIcon.addEventListener('click', () => {
                toggleComplete(project, index);
            });
            actionsSpan.appendChild(completeIcon);

            const editIcon = document.createElement("span");
            editIcon.className = "edit-icon material-symbols-outlined";
            editIcon.textContent = "edit";
            editIcon.setAttribute("aria-label", "Edit Item");
            editIcon.addEventListener("click", () => editItem(project.name, index, true));
            actionsSpan.appendChild(editIcon);

            const deleteIcon = document.createElement("span");
            deleteIcon.className = "delete-icon material-symbols-outlined";
            deleteIcon.textContent = "delete";
            deleteIcon.setAttribute("aria-label", "Delete Item");
            deleteIcon.addEventListener('click', () => {
                deleteItem(project, item)
                renderAllItems(allProjects);
            });
            actionsSpan.appendChild(deleteIcon);

            itemDiv.appendChild(actionsSpan);

            if (item.complete) {
                completedItemsDiv.appendChild(itemDiv);
                completeIcon.textContent = 'undo';
                completeIcon.setAttribute("aria-label", 'Undo Complete');
                hasCompletedItems = true;
            } else {
                itemsDiv.appendChild(itemDiv);
            }
        });
    });

    const completedTasksHeader = document.querySelector("#completed-tasks-header");
    const completedItemsHeader = document.querySelector("#completed-items-header");
    if (hasCompletedItems) {
        completedTasksHeader.style.display = 'grid';
        completedItemsHeader.style.display = 'grid';
    } else {
        completedTasksHeader.style.display = 'none';
        completedItemsHeader.style.display = 'none';
    }
}

export default renderAllItems;