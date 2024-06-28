function projects() {
    const projects = [];

    const addProject = (project) => {
        projects.push(project);
        console.log(`Project ${project.name} added to projects.`)
    };

    const removeProject = (project) => {
        const index = projects.indexOf(project);
        if (index > -1) {
            console.log(`Deleting ${project.name}.`)
            projects.splice(index, 1);
        }
    };

    return { projects, addProject, removeProject };
}

export default projects;