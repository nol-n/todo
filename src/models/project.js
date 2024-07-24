import projects from "./projects.js";

function createProject(name) {
    const items = [];

    const addItem = (toDoItem) => {
        items.push(toDoItem);
        projects.saveProjectsToLocalStorage();
        console.log(`Item "${toDoItem.title}" added to project "${name}".`);
    };

    const removeItem = (toDoItem) => {
        const index = items.indexOf(toDoItem);
        if (index > -1) {
            console.log(`Deleting ${toDoItem.title} from ${name}.`)
            toDoItem.del();
            items.splice(index, 1);
            projects.saveProjectsToLocalStorage();
        }
    };

    const getItems = () => items;

    const toJSON = () => ({
        name,
        items: items.map(item => item.toJSON()),
    });

    return { name, addItem, removeItem, getItems, toJSON };
}

export default createProject;