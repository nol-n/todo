import projects from "./models/projects.js";
import addItemDialog from "./components/addItem.js";
import addProjectInput from "./components/addProject.js";
import renderProjects from "./components/renderProjects.js";
import renderAllItems from "./components/renderAllItems.js";
import { setupNotifications, addAction } from "./components/notifications.js";
import createProject from "./models/project.js";
import toDoItem from "./models/todoitem.js";
import avatar from "./img/longhorn.jpg";
import "./style.css";

// Load projects from localStorage
projects.loadProjectsFromLocalStorage();

// Initialize some sample data
if (projects.getProjects().length === 0) {
    //Project data loaded from initialization and not from local storage
    const project1 = createProject("Project 1");
    const project2 = createProject("Project 2");

    const item1 = toDoItem("Task 1", "Do this Task 1 First", "2024-01-01", "High");
    const item2 = toDoItem("Task 2", "Do this Task 2 Second", "2024-05-05", "Medium");
    const item3 = toDoItem("Task 3", "Do this Task 1 First", "2024-05-30", "Low");
    const item4 = toDoItem("Task 4", "Do this Task 2 Second", "2024-02-12", "High");

    project1.addItem(item1);
    project1.addItem(item2);

    project2.addItem(item3);
    project2.addItem(item4);

    projects.addProject(project1);
    projects.addProject(project2);


    //manually add in notifications for sample data above
    addAction(`Task 1 added to Project 1.`);
    addAction(`Task 2 added to Project 1.`);
    addAction(`Task 3 added to Project 1.`);
    addAction(`Task 4 added to Project 1.`);
}


renderProjects(projects);
renderAllItems(projects);

setupNotifications();



document.querySelector("#project-header").onclick = () => {
    renderAllItems(projects);
}

document.querySelector("#avatar").addEventListener("click", () => {
    window.location.href = "index.html"; // Redirect to the main page (adjust the URL as needed)
    projects.saveProjectsToLocalStorage()
});

//event handlers for adding items
document.querySelector("#show-add-item-dialog").onclick = () => {
    document.querySelector("#add-item-dialog").showModal();
};

document.querySelector("#add-item-button").onclick = () => {
    const currentProjectBullet = document.querySelector(".project.selected")?.textContent.replace("tag", "");
    const project = projects.getProjects().find(proj => proj.name === currentProjectBullet);
    if (project) {
        addItemDialog(project);
    } else {
        alert("Project not found. Switch to an existing project.");
    }
};

//event handlers for adding projects
document.querySelector("#add-project").onclick = () => {
    addProjectInput(projects);
};

//load avatar image
document.querySelector("#avatar").src = avatar;
