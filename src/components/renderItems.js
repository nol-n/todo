import { editItem } from "./editItem.js";
import { toggleComplete } from "./completeItem.js";
import projects from "../models/projects.js";
import renderProjects from "./renderProjects.js";
import renderAllItems from "./renderAllItems.js";
import { deleteItem } from "./deleteItem.js";
import { deleteProject } from "./deleteProject.js";
import editProject from "./editProject.js";
import { format, parseISO } from 'date-fns';

function renderItems(project) {
    const itemsDiv = document.querySelector("#items");
    const completedItemsDiv = document.querySelector("#completed-items");

    itemsDiv.innerHTML = '';
    completedItemsDiv.innerHTML = '';

    const projectHeaderDiv = document.querySelector("#project-items-header");

    let projectHeader = document.querySelector("#project-items-header h3");
    if (!projectHeader) {
        projectHeader = document.createElement("h3");
        projectHeaderDiv.appendChild(projectHeader);
    }
    projectHeader.innerHTML = '';
    projectHeader.textContent = (`${project.name} - Tasks`);

    //handles adding edit/delete buttons for projects

    const existingEditButton = document.querySelector(".edit-project-button");
    const existingDeleteButton = document.querySelector(".delete-project-button");
    if (existingEditButton) projectHeaderDiv.removeChild(existingEditButton);
    if (existingDeleteButton) projectHeaderDiv.removeChild(existingDeleteButton);

    if (projectHeader.textContent !== "All Tasks") {
        const editProjectButton = document.createElement("button");
        editProjectButton.className = "edit-project-button";
        editProjectButton.textContent = "Edit Project";
        editProjectButton.setAttribute("aria-label", "Edit Project");
        editProjectButton.addEventListener('click', () => editProject(project));

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.className = "delete-project-button";
        deleteProjectButton.textContent = "Delete Project";
        deleteProjectButton.setAttribute("aria-label", "Delete Project");
        deleteProjectButton.addEventListener('click', () => {
            deleteProject(projects, project);
            renderAllItems(projects);
            renderProjects(projects);
        });

        projectHeaderDiv.appendChild(editProjectButton);
        projectHeaderDiv.appendChild(deleteProjectButton);
    }

    let hasCompletedItems = false;

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
        editIcon.addEventListener("click", () => editItem(project.name, index));
        actionsSpan.appendChild(editIcon);

        const deleteIcon = document.createElement("span");
        deleteIcon.className = "delete-icon material-symbols-outlined";
        deleteIcon.textContent = "delete";
        deleteIcon.setAttribute("aria-label", "Delete Item");
        deleteIcon.addEventListener('click', () => {
            deleteItem(project, item);
            renderItems(project);
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

    const completedTasksHeader = document.querySelector("#completed-tasks-header");
    const completedItemsHeader = document.querySelector("#completed-items-header");
    if (hasCompletedItems) {
        completedTasksHeader.innerHTML = `<h3>${project.name} - Completed Tasks</h3>`;
        completedTasksHeader.style.display = 'grid';
        completedItemsHeader.style.display = 'grid';
    } else {
        completedTasksHeader.style.display = 'none';
        completedItemsHeader.style.display = 'none';
    }
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