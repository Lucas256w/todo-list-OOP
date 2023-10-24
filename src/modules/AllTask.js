import { LoadTask } from "./Task"

class AllTask {
    static loadAllTask() {
        const title = document.querySelector('#tab-title')
        title.textContent = 'All Tasks';
        const content = document.querySelector('#content')
        content.innerHTML = ''
        const taskList = document.createElement('div')
        taskList.id = 'task-list'

        content.appendChild(taskList)

        LoadTask.loadAllTasks(taskList)
    }
}

export default AllTask