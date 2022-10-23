const todoIcon = document.querySelector('.todo__icon');
const todo = document.querySelector('.todo');
const todoEmpty = document.querySelector('.todo__empty');
const emptyBtn = document.querySelector('.empty__btn');
const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__form input');
const todoList = document.querySelector('.todo__list');
const todoExist = document.querySelector('.todo__exist');

// TODO
const handlePop = () => {
  todo.classList.toggle('d-none');
};

const handleEmptyBtnClick = () => {
  todoInput.classList.remove('v-hidden');
  todoInput.focus();
};

const handleSubmit = event => {
  event.preventDefault();

  // localStorage에 아이템 추가
  let todos = [];
  const localTodo = JSON.parse(localStorage.getItem('todos'));
  if (localTodo !== null) todos = localTodo;

  const todo = {
    id: Date.now(),
    text: event.target[0].value,
    checked: false,
  };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  event.target[0].value = '';

  paint(todo);
  if (!todoEmpty.classList.contains('d-none')) todoEmpty.classList.add('d-none');
  if (todoExist.classList.contains('d-none')) todoExist.classList.remove('d-none');
};

const paint = todo => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const icon = document.createElement('i');

  li.id = todo.id;
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(icon);
  checkbox.type = 'checkbox';
  checkbox.checked = todo.checked;
  checkbox.addEventListener('click', handleCheckboxClick);
  if (todo.checked) li.classList.add('t-line');
  span.innerText = todo.text;
  icon.classList.add('fa-solid', 'fa-trash');
  icon.addEventListener('click', handleDeleteClick);
  todoList.appendChild(li);
};

const handleCheckboxClick = event => {
  // 취소선 클래스 추가
  const li = event.target.closest('li');
  const checkbox = li.querySelector('input');
  li.classList.toggle('t-line');

  // localStorage에 변경사항 저장
  const localTodo = JSON.parse(localStorage.getItem('todos'));
  const index = localTodo.findIndex(todo => String(todo.id) === li.id);
  localTodo[index].checked = checkbox.checked;
  localStorage.setItem('todos', JSON.stringify(localTodo));
};

const handleDeleteClick = event => {
  // 엘리먼트 삭제
  const li = event.target.closest('li');
  li.remove();

  // localStorage에 변경사항 저장
  const localTodo = JSON.parse(localStorage.getItem('todos'));
  const newTodo = localTodo.filter(todo => String(todo.id) !== li.id);
  localStorage.setItem('todos', JSON.stringify(newTodo));

  // localStorage가 비어있으면
  if (newTodo === null || newTodo.length === 0) {
    todoEmpty.classList.remove('d-none');
    todoInput.classList.add('v-hidden');
    todoExist.classList.add('d-none');
  }
};

const firstPaint = () => {
  const localTodo = JSON.parse(localStorage.getItem('todos'));

  if (localTodo !== null && localTodo.length !== 0) {
    localTodo.forEach(element => {
      paint(element);
    });
    todoInput.classList.remove('v-hidden');
  } else {
    todoEmpty.classList.remove('d-none');
    todoInput.classList.add('v-hidden');
    todoExist.classList.add('d-none');
  }
};

/* Add Event Listener */
todoIcon.addEventListener('click', handlePop);
emptyBtn.addEventListener('click', handleEmptyBtnClick);
todoForm.addEventListener('submit', handleSubmit);

/* Running */
firstPaint();
// localStorage.removeItem('todos');
