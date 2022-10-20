const todoIcon = document.querySelector('.todo__icon');
const todoEmpty = document.querySelector('.todo__empty');
const emptyBtn = document.querySelector('.empty__btn');
const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__form input');
const todoList = document.querySelector('.todo__list');

// TODO
const handlePop = () => {};

const handleEmptyBtnClick = () => {
  todoInput.classList.remove('v-hidden');
  todoInput.focus();
};

const handleSubmit = event => {
  event.preventDefault();

  /* localStorage에 아이템 추가 */
  let todos = [];
  const localTodo = JSON.parse(localStorage.getItem('todos'));
  if (localTodo !== null) todos = localTodo;

  const todo = {
    id: Date.now(),
    text: event.target[0].value,
    check: false,
  };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  event.target[0].value = '';

  /* 기존 엘리먼트에 추가 */
  paint(todo);
};

const paint = todo => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const checkbox = document.createElement('input');

  li.id = todo.id;
  li.appendChild(checkbox);
  li.appendChild(span);
  checkbox.type = 'checkbox';
  checkbox.checked = todo.check;
  if (todo.check) span.classList.add('text-dashed');
  span.innerText = todo.text;
  todoList.appendChild(li);
};

const firstPaint = () => {
  const localTodo = JSON.parse(localStorage.getItem('todos'));
  if (localTodo) {
    localTodo.forEach(element => {
      paint(element);
    });
    todoInput.classList.remove('v-hidden');
    todoInput.focus = true;
    console.dir(todoInput);
  }
};

/* Add Event Listener */
todoIcon.addEventListener('click', handlePop);
emptyBtn.addEventListener('click', handleEmptyBtnClick);
todoForm.addEventListener('submit', handleSubmit);

/* Running */
firstPaint();
