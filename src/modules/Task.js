import Project from "./Project"
import { tasks } from "./Storage"
import AllTask from "./AllTask"

class Task {
    constructor(title, description, dueDate, priority, project, checked) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project = project
        this.checked = checked
    }

    editTask(project) {
        const content = document.querySelector('#content')
        content.innerHTML = `
        <div id="add-tasks-inputs-container" style="display: flex;">
            <label for="task-title">Title: </label>
            <input type="text" id="task-title" value=${this.title}>
            <label for="task-description">Description: </label>
            <textarea id="task-description">${this.description}</textarea>
            <label for="task-date">Date: </label>
            <input type="date" id="task-date" value=${this.dueDate}>
            <div id="priority-title">Priority: </div>
            <div id="priority-button-container">
                <button id="low-priority-btn">Low</button>
                <button id="med-priority-btn">Med</button>
                <button id="high-priority-btn">High</button>
             </div>
            <div id="add-cancel-task-container">
            <button id="add-task-confirm-button">Add</button>
            <button id="cancel-task-confirm-button">Cancel</button>
            </div>
        </div>
        `;

        const taskTitle = document.querySelector('#task-title');
        const taskDescription = document.querySelector('#task-description');
        const taskDate = document.querySelector('#task-date')
        const lowPrioBtn = document.querySelector('#low-priority-btn');
        const medPrioBtn = document.querySelector('#med-priority-btn');
        const highPrioBtn = document.querySelector('#high-priority-btn');

        const addTaskbtn = document.querySelector('#add-task-confirm-button');
        const cancelBtn = document.querySelector('#cancel-task-confirm-button');
        
        let selectedPrio = this.priority
        if(selectedPrio == 'Low') {
            lowPrioBtn.className = 'selectedPrio'
        } else if (selectedPrio == 'Med') {
            medPrioBtn.className = 'selectedPrio'
        } else if (selectedPrio == 'High') {
            highPrioBtn.className = 'selectedPrio'
        }

        lowPrioBtn.addEventListener('click', ()=>{
            lowPrioBtn.className = 'selectedPrio'
            medPrioBtn.className = ''
            highPrioBtn.className = ''

            selectedPrio = 'Low'
        })
        medPrioBtn.addEventListener('click', ()=>{
            lowPrioBtn.className = ''
            medPrioBtn.className = 'selectedPrio'
            highPrioBtn.className = ''

            selectedPrio = 'Med'
        })
        highPrioBtn.addEventListener('click', ()=>{
            lowPrioBtn.className = ''
            medPrioBtn.className = ''
            highPrioBtn.className = 'selectedPrio'

            selectedPrio = 'High'
        })

        cancelBtn.addEventListener('click', ()=>{
            Project.viewProjectPage(project)
        })

        addTaskbtn.addEventListener('click', ()=>{
            if (taskTitle.value.trim() != '' && taskDescription.value.trim() != '' && taskDate.value != '' && selectedPrio != ''){
                this.title = taskTitle.value;
                this.description = taskDescription.value;
                this.dueDate = taskDate.value;
                this.priority = selectedPrio;
                console.log(tasks)
                Project.viewProjectPage(project)
            } else {
                console.log(taskTitle.value.trim(), taskDescription.value.trim(), taskDate.value, selectedPrio)
                alert('Please fill all information')
            }
        })


    }
}

class MakeNewTask {
    static generateForm(project) {
        const content = document.querySelector('#content')
        content.innerHTML = `
        <div id="add-tasks-inputs-container" style="display: flex;">
            <label for="task-title">Title: </label>
            <input type="text" id="task-title">
            <label for="task-description">Description: </label>
            <textarea id="task-description"></textarea>
            <label for="task-date">Date: </label>
            <input type="date" id="task-date">
            <div id="priority-title">Priority: </div>
            <div id="priority-button-container">
                <button id="low-priority-btn">Low</button>
                <button id="med-priority-btn">Med</button>
                <button id="high-priority-btn">High</button>
             </div>
            <div id="add-cancel-task-container">
            <button id="add-task-confirm-button">Add</button>
            <button id="cancel-task-confirm-button">Cancel</button>
            </div>
        </div>
        `;

        const taskTitle = document.querySelector('#task-title');
        const taskDescription = document.querySelector('#task-description');
        const taskDate = document.querySelector('#task-date')
        const lowPrioBtn = document.querySelector('#low-priority-btn');
        const medPrioBtn = document.querySelector('#med-priority-btn');
        const highPrioBtn = document.querySelector('#high-priority-btn');

        const addTaskbtn = document.querySelector('#add-task-confirm-button');
        const cancelBtn = document.querySelector('#cancel-task-confirm-button');

        let selectedPrio = ''

        lowPrioBtn.addEventListener('click', ()=>{
            lowPrioBtn.className = 'selectedPrio'
            medPrioBtn.className = ''
            highPrioBtn.className = ''

            selectedPrio = 'Low'
        })
        medPrioBtn.addEventListener('click', ()=>{
            lowPrioBtn.className = ''
            medPrioBtn.className = 'selectedPrio'
            highPrioBtn.className = ''

            selectedPrio = 'Med'
        })
        highPrioBtn.addEventListener('click', ()=>{
            lowPrioBtn.className = ''
            medPrioBtn.className = ''
            highPrioBtn.className = 'selectedPrio'

            selectedPrio = 'High'
        })

        cancelBtn.addEventListener('click', ()=>{
            Project.viewProjectPage(project)
        })

        addTaskbtn.addEventListener('click', ()=>{
            if (taskTitle.value.trim() != '' && taskDescription.value.trim() != '' && taskDate.value != '' && selectedPrio != ''){
                const task = new Task(taskTitle.value, taskDescription.value, taskDate.value, selectedPrio, project, false)
                tasks.push(task)
                console.log(tasks)
                Project.viewProjectPage(project)
            } else {
                console.log(taskTitle.value.trim(), taskDescription.value.trim(), taskDate.value, selectedPrio)
                alert('Please fill all information')
            }
        })

        
      
    }
}

class LoadTask {
    static loadTaskForProject(project, taskList) {
        tasks.forEach((task) =>  {
            if (task.project == project){
                LoadTask.loadTaskGeneral(task, taskList, false)

            }
        })
    }

    static loadAllTasks(taskList) {
        tasks.forEach((task) =>  {
                LoadTask.loadTaskGeneral(task, taskList, true)
        })
    }

    static loadTaskGeneral(task, taskList, today) {
        const taskCard = document.createElement('div')
                taskCard.className = 'task-card'
                
                const checkBox = document.createElement('div')
                checkBox.className = 'card-check-box'
                checkBox.addEventListener('click', ()=>{
                    if (task.checked == false) {
                        task.checked = true 
                        checkBox.classList.toggle('checked')
                        taskCard.classList.toggle('checked')
                    } else {
                        task.checked = false
                        checkBox.classList.toggle('checked')
                        taskCard.classList.toggle('checked')
                    }
                })

                if (task.checked == true) {
                    checkBox.classList.add('checked')
                    taskCard.classList.add('checked')
                }

                const title = document.createElement('div')
                title.className = 'card-title'
                title.textContent = task.title;

                const details = document.createElement('button')
                details.className = 'card-details-button'
                details.textContent = 'details'
                details.addEventListener('click', ()=> {
                    task.editTask(task.project)
                })

                const date = document.createElement('div')
                date.className = 'card-date'
                date.textContent = task.dueDate

                const priority = document.createElement('div')
                priority.className = 'card-prio'
                priority.textContent = task.priority

                const deleteCard = document.createElement('div')
                deleteCard.className = 'card-delete'
                deleteCard.textContent = 'X'
                deleteCard.addEventListener('click', ()=> {
                    let currentProject = task.project
                    const index = tasks.indexOf(task)
                    tasks.splice(index, 1)
                    if (today) {
                        AllTask.loadAllTask()
                    } else {
                        Project.viewProjectPage(currentProject)
                    }
                })

                taskCard.appendChild(checkBox)
                taskCard.appendChild(title)
                taskCard.appendChild(details)
                taskCard.appendChild(date)
                taskCard.appendChild(priority)
                taskCard.appendChild(deleteCard)



                taskList.appendChild(taskCard)
    }
}


export default Task
export {MakeNewTask, LoadTask}