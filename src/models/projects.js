import createProject from './project.js';
import toDoItem from './todoitem.js';

const projectsModule = (() => {
    const projects = [];

    const addProject = (project) => {
        projects.push(project);
        saveProjectsToLocalStorage();
        console.log(`Project ${project.name} added to projects.`)
    };

    const removeProject = (project) => {
        const index = projects.indexOf(project);
        if (index > -1) {
            console.log(`Deleting ${project.name}.`)
            projects.splice(index, 1);
            saveProjectsToLocalStorage();
        }
    };

    const getProjects = () => projects;

    const saveProjectsToLocalStorage = () => {
        try {
            const projectsToSave = projects.map(p => p.toJSON());
            console.log("Saving projects to localStorage:", projectsToSave); 
            localStorage.setItem('projects', JSON.stringify(projectsToSave));
        } catch (error) {
            console.error('Error saving projects to localStorage:', error);
        }
    };

    const loadProjectsFromLocalStorage = () => {
        try {
            const savedProjects = JSON.parse(localStorage.getItem('projects'));
            if (savedProjects) {
                // Clear the existing projects array without reassigning
                projects.length = 0;
                savedProjects.forEach(projectData => {
                    const project = createProject(projectData.name);
                    projectData.items.forEach(itemData => {
                        const item = toDoItem(itemData.title, itemData.desc, itemData.dueDate, itemData.priority);
                        item.complete = itemData.complete;
                        project.addItem(item);
                    });
                    projects.push(project);
                });
                console.log('Loaded projects from localStorage:', projects);
                saveProjectsToLocalStorage();
            }
        } catch (error) {
            console.error('Error loading projects from localStorage:', error);
        }
    };

    return { addProject, removeProject, getProjects, saveProjectsToLocalStorage, loadProjectsFromLocalStorage };
})();

export default projectsModule;