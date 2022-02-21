/* eslint-disable complexity */
const newTaskInput = document.getElementById('texto-tarefa');
const addTaskBtn = document.getElementById('criar-tarefa');
const taskList = document.getElementById('lista-tarefas');
const clearAllBtn = document.getElementById('apaga-tudo');
const clearCompletedBtn = document.getElementById('remover-finalizados');
const saveItemsBtn = document.getElementById('salvar-tarefas');
const moveUpBtn = document.getElementById('mover-cima');
const moveDownBtn = document.getElementById('mover-baixo');
const removeSelectedBtn = document.getElementById('remover-selecionado');
const previousSavedList = localStorage.getItem('listItems');

function moveItem(event) {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    const previousItem = selectedItem.previousElementSibling;
    const nextItem = selectedItem.nextElementSibling;
    if (event.currentTarget === moveUpBtn
      && selectedItem !== taskList.firstElementChild) {
      taskList.removeChild(selectedItem);
      taskList.insertBefore(selectedItem, previousItem);
    } else if (event.currentTarget === moveDownBtn
      && selectedItem !== taskList.lastElementChild) {
      taskList.removeChild(selectedItem);
      taskList.insertBefore(selectedItem, nextItem.nextElementSibling);
    }
  }
}

function removeSelected() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem) {
    selectedItem.remove();
  }
}

function getPreviousList() {
  const list = JSON.parse(previousSavedList);

  for (let i = 0; i < list.length; i += 1) {
    const item = document.createElement('li');
    item.textContent = list[i].textContent;

    if (list[i].isCompleted) {
      item.classList.add('completed');
    }

    item.addEventListener('click', changeItemBackgroundColor);
    item.addEventListener('dblclick', markAsCompleted);
    taskList.appendChild(item);
  }
}

if (localStorage.length) {
  getPreviousList();
}

function saveItems() {
  const items = [];
  for (let i = 0; i < taskList.childNodes.length; i += 1) {
    const currentItem = taskList.childNodes[i];
    const object = {
      textContent: currentItem.textContent,
      isCompleted: currentItem.classList.contains('completed'),
    };
    items.push(object);
  }
  localStorage.setItem('listItems', JSON.stringify(items));
}

function clearAll() {
  for (let i = taskList.childNodes.length - 1; i >= 0; i -= 1) {
    taskList.childNodes[i].remove();
  }
}

function clearCompleted() {
  for (let i = taskList.childNodes.length - 1; i >= 0; i -= 1) {
    const currentElement = taskList.childNodes[i];
    if (currentElement.classList.contains('completed')) {
      currentElement.remove();
    }
  }
}

function changeItemBackgroundColor(event) {
  const item = event.target;

  if (document.querySelector('.selected')) {
    document.querySelector('.selected').classList.remove('selected');
  }

  item.classList.add('selected');
}

function markAsCompleted(event) {
  const item = event.target;
  item.classList.toggle('completed');
}

function addNewTask(event) {
  const newListItem = document.createElement('li');

  if (event.target === newTaskInput && event.key !== 'Enter') {
    return;
  }

  if (!newTaskInput.value) {
    return;
  }

  newListItem.textContent = newTaskInput.value;
  newListItem.addEventListener('click', changeItemBackgroundColor);
  newListItem.addEventListener('dblclick', markAsCompleted);
  taskList.appendChild(newListItem);
  newTaskInput.value = '';
}

addTaskBtn.addEventListener('click', addNewTask);
newTaskInput.addEventListener('keyup', addNewTask);
clearAllBtn.addEventListener('click', clearAll);
clearCompletedBtn.addEventListener('click', clearCompleted);
saveItemsBtn.addEventListener('click', saveItems);
removeSelectedBtn.addEventListener('click', removeSelected);
moveUpBtn.addEventListener('click', moveItem);
moveDownBtn.addEventListener('click', moveItem);
