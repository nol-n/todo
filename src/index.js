import projects from "./projects.js";
import project from "./project.js";
import toDoItem from "./todoitem.js";
import './style.css';

const item1 = toDoItem("Task 1", "Do this Task 1 First", "01/01/24", "High")
const project1 = project("Project 1");
project1.addItem(item1);
const allProjects = projects();
allProjects.addProject(project1);

const item2 = toDoItem("Task 2", "Do this Task 2 First", "05/05/24", "High")
project1.addItem(item2);

console.log(allProjects.projects);

item1.edit("title", "Edited Task 1");
console.log(allProjects.projects);

project1.removeItem(item1);
console.log(allProjects.projects);
