const storedProjects = JSON.parse(localStorage.getItem('projects'));
const storedTasks = JSON.parse(localStorage.getItem('tasks'));

const projects =  storedProjects || []
const tasks = storedTasks || []


export {projects, tasks, storedProjects, storedTasks}