import UserInterface from "./UI";
import { projects, storedProjects, storedTasks, tasks } from "./Storage";
import { MakeNewTask, LoadTask } from "./Task";
import AllTask from "./AllTask";

class Project {
    static addProjectUi() {
        const projectInput = document.querySelector('#add-project-input-container');
        const addProjectBtn = document.querySelector('#add-projects-button')
        Project.addProjectBtn(addProjectBtn, projectInput)
        Project.confirmBtn(addProjectBtn, projectInput)
        Project.cancelBtn(addProjectBtn, projectInput)
    }
    static addProjectBtn(addProjectBtn, projectInput) {
        addProjectBtn.addEventListener('click', ()=> {
            addProjectBtn.style.display = 'none'
            projectInput.style.display = 'grid'
            console.log(projects)
        })
    }

    static confirmBtn(addProjectBtn, projectInput) {
        const addBtn = document.querySelector('#add-button')
        addBtn.addEventListener('click', ()=> {
            const input = document.querySelector('#add-project-input')
            if (projects.includes(input.value)){
                alert(`${input.value} already exist`)
            } else if (input.value.trim() == ''){
                alert('enter a value please')
            } else {
                projects.push(input.value);
                localStorage.setItem('projects', JSON.stringify(projects));
                Project.generateProjects()
                input.value =''
                projectInput.style.display = 'none'
                addProjectBtn.style.display = 'block'
            }

        })
    }

    static cancelBtn(addProjectBtn, projectInput) {
        const cancelBtn = document.querySelector('#cancel-button')
        cancelBtn.addEventListener('click',()=> {
            const input = document.querySelector('#add-project-input')
            input.value =''
            projectInput.style.display = 'none'
            addProjectBtn.style.display = 'block'
        })
    }

    static generateProjects() {
        const projectList = document.querySelector('#project-list')
        projectList.innerHTML = ''
        projects.forEach((project)=> {
            const projectContainer = document.createElement('div')
            projectContainer.className = 'project-container'
            const projectSingle = document.createElement('button')
            projectSingle.className = 'project'
            projectSingle.textContent = project
            const deleteProjectBtn = document.createElement('button')
            deleteProjectBtn.className = 'delete-project-button'
            deleteProjectBtn.textContent = 'X'
            
            deleteProjectBtn.addEventListener('click', ()=>{
                Project.deleteProject(project)
                AllTask.loadAllTask()
            })

            projectSingle.addEventListener('click', ()=>{
                Project.viewProjectPage(project)
            })

            projectContainer.appendChild(projectSingle)
            projectContainer.appendChild(deleteProjectBtn)

            projectList.appendChild(projectContainer)
        })
    }

    static deleteProject(project) {
        const index = projects.indexOf(project)
        projects.splice(index, 1)

        tasks.forEach((task)=> {
            if(task.project == project){
                const taskIndex = tasks.indexOf(task)
                tasks.splice(taskIndex, 1)
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('projects', JSON.stringify(projects))
        Project.generateProjects()
    }

    static viewProjectPage(project) {
        const title = document.querySelector('#tab-title')
        title.textContent = project;
        const content = document.querySelector('#content')
        content.innerHTML = ''

        const addTaskBtn = document.createElement('button')
        addTaskBtn.id = 'add-task-button'
        addTaskBtn.textContent = '+ Add Task'
        addTaskBtn.addEventListener('click', ()=>{
            MakeNewTask.generateForm(project)
        })

        const taskList = document.createElement('div')
        taskList.id = 'task-list'

        content.appendChild(addTaskBtn)
        content.appendChild(taskList)

        LoadTask.loadTaskForProject(project, taskList)
    }

}

export default Project