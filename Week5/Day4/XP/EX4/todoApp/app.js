import { TodoList } from './todo.js'

const myTodoList = new TodoList()

myTodoList.addTask("Buy groceries")
myTodoList.addTask("Walk the dog")
myTodoList.addTask("Finish homework")

const allTasks = myTodoList.listTasks();
if (allTasks.length > 0) {
  const firstTaskId = allTasks[0].id;
  myTodoList.completeTask(firstTaskId);
}

console.log("Current Tasks:");
myTodoList.listTasks().forEach(task => {
  console.log(`- [${task.completed ? '✓' : ' '}] ${task.text} (ID: ${task.id})`);
});