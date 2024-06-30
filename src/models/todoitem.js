function toDoItem(title, desc, dueDate, priority) {
    const complete = false;
    
    const del = () => {
        for (let prop in toDoItemInstance) {
            if (toDoItemInstance.hasOwnProperty(prop)) {
                delete toDoItemInstance[prop];
            }
        }
        console.log(`toDoItem deleted.`)
    };

    const edit = (prop, value) => {
        if (toDoItemInstance.hasOwnProperty(prop)) {
            toDoItemInstance[prop] = value;
            console.log (`${toDoItemInstance.title} ${prop} has been updated to ${value}.`);
        } else {
            console.log (`${prop} not valid.`);
        }
    };

    const toDoItemInstance = { title, desc, dueDate, priority, complete, del, edit };

    return toDoItemInstance;
}

export default toDoItem;