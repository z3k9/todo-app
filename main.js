const form = document.querySelector('form');
const input = document.querySelector('input');
const todoListDiv = document.querySelector('.todos');

const todos = JSON.parse(localStorage.getItem('todos'));
if(todos){
    todos.forEach(todo=>{
        addTodo(todo);
    });
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addTodo();
});



function addTodo(todo){
    let todoText = input.value;
    const todoListEl = document.createElement('li');

    
    if(todo){
        todoText = todo['text'];
    }
    
    if(todo && todo['completed']){
        todoListEl.classList.add('completed');
    }
    todoListEl.innerText = todoText;
    todoListDiv.appendChild(todoListEl);

    todoListEl.addEventListener('click', ()=>{
        todoListEl.classList.toggle('completed');
        updateLS();
    });
    todoListEl.addEventListener('contextmenu', (e)=>{
        e.preventDefault();

        todoListEl.remove();
        updateLS();
    });
    input.value = '';

    updateLS();
}

function updateLS(){
    const todoDiv = document.querySelectorAll('li');
    const todos = [];
    todoDiv.forEach(todoEl=>{
        todos.push({
            text: todoEl.innerText,
            completed : todoEl.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}