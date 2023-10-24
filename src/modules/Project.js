import UserInterface from "./UI";

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
        })
    }

    static confirmBtn(addProjectBtn, projectInput) {
        const addBtn = document.querySelector('#add-button')
        addBtn.addEventListener('click', ()=> {
            projectInput.style.display = 'none'
            addProjectBtn.style.display = 'block'
        })
    }

    static cancelBtn(addProjectBtn, projectInput) {
        const cancelBtn = document.querySelector('#cancel-button')
        cancelBtn.addEventListener('click',()=> {
            projectInput.style.display = 'none'
            addProjectBtn.style.display = 'block'
        })
    }
}

export default Project