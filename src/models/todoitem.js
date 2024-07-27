import projects from "./projects.js";

function toDoItem(title, desc, dueDate, priority) {
    const complete = false;
    
    const del = () => {
        for (let prop in toDoItemInstance) {
            if (toDoItemInstance.hasOwnProperty(prop)) {
                delete toDoItemInstance[prop];
            }
        }
        projects.saveProjectsToLocalStorage();
    };

    const edit = (prop, value) => {
        if (toDoItemInstance.hasOwnProperty(prop)) {
            toDoItemInstance[prop] = value;
        }
        projects.saveProjectsToLocalStorage();
    };

    const toJSON = () => ({
        title: toDoItemInstance.title,
        desc: toDoItemInstance.desc,
        dueDate: toDoItemInstance.dueDate,
        priority: toDoItemInstance.priority,
        complete: toDoItemInstance.complete,
    });

    const toDoItemInstance = { 
        title, 
        desc, 
        dueDate, 
        priority, 
        complete, 
        del, 
        edit,
        toJSON, 
    };

    return toDoItemInstance;
}

export default toDoItem;