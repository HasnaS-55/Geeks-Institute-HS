export class TodoList {
  constructor() {
    this.tasks = []
  }


  addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    this.tasks.push(newTask);
    return newTask;
  }


  completeTask(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = true;
      return true;
    }
    return false
  }


  listTasks() {
    return this.tasks;
  }

 
  deleteTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks.length < initialLength; // Returns true if deleted
  }
}