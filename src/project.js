import toDoItem from './todoitem.js';

function project(name) {
    const items = [];

    const addItem = (toDoItem) => {
        items.push(toDoItem);
        console.log(`Item "${toDoItem.title}" added to project "${name}".`);
    };

    const removeItem = (toDoItem) => {
        const index = items.indexOf(toDoItem);
        if (index > -1) {
            console.log(`Deleting ${toDoItem.title} from ${name}.`)
            toDoItem.del();
            items.splice(index, 1);
        }
    };

    return { name, items, addItem, removeItem };
}

export default project;