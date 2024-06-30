function renderItems(project) {
    const itemsDiv = document.querySelector("#items");
    itemsDiv.innerHTML = '';

    project.getItems().forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item-div";

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

        const completeSpan = document.createElement("span");
        completeSpan.className = "complete-span";
        completeSpan.textContent = item.complete;
        itemDiv.appendChild(completeSpan);

        itemsDiv.appendChild(itemDiv);

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