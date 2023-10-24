import Project from "./Project"
import AllTask from "./AllTask"

class UserInterface {
    static activateInterface() {
        Project.addProjectUi()

        const allTask = document.querySelector('#all-tasks-tab')
        allTask.addEventListener('click', ()=>{
            AllTask.loadAllTask()
        })

        AllTask.loadAllTask()
        Project.generateProjects()
    }
    
}

export default UserInterface