import projects from "./models/projects.js";
import addItemDialog from "./components/addItem.js";
import addProjectInput from "./components/addProject.js";
import renderProjects from "./components/renderProjects.js";
import project from "./models/project.js";
import toDoItem from "./models/todoitem.js";
import "./style.css";


const allProjects = projects();

// Initialize some sample data
const project1 = project("Project 1");
const project2 = project("Project 2");

const item1 = toDoItem("Task 1", "Do this Task 1 First", "2024-01-01", "High");
const item2 = toDoItem("Task 2", "Do this Task 2 Second", "2024-05-05", "Medium");

project1.addItem(item1);
project1.addItem(item2);

allProjects.addProject(project1);
allProjects.addProject(project2);

renderProjects(allProjects);

//event handlers for adding items
document.querySelector("#show-add-item-dialog").onclick = () => {
    document.querySelector("#add-item-dialog").showModal();
};

document.querySelector("#add-item-button").onclick = () => {
    const currentProjectBullet = document.querySelector(".project.selected")?.textContent;
    const project = allProjects.getProjects().find(proj => proj.name === currentProjectBullet);

    if(project) {
        addItemDialog(project);
    } else {
        alert("Project not found.");
    }
};

//event handlers for adding projects
document.querySelector("#add-project").onclick = () => {
    addProjectInput(allProjects);
};
