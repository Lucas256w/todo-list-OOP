class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
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
      
    }
}

export default Task
export {MakeNewTask}