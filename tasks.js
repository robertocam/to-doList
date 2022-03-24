let inputNewTask = document.querySelector('#inputNewTask');
let btnAddTask = document.querySelector('#btnAddTask');
let tasksList = document.querySelector('#tasksList');
let editionWindow = document.querySelector('#editionWindow');
let backgroundEditWindow = document.querySelector ('#backgroundEditWindow');
let editionWindowBtnClose = document.querySelector ('#editionWindowBtnClose');
let btnUpdateTask = document.querySelector ('#btnUpdateTask');
let idTaskEdition = document.querySelector ('#idTaskEdition');
let inputTaskNameEdition = document.querySelector ('#inputTaskNameEdition');

inputNewTask.addEventListener('keypress', (e) => {

  if(e.keyCode == 13) {
    let Task = {
      name: inputNewTask.value,
      id: generateId(),
    }
    addTask(Task);
  }
});

editionWindowBtnClose.addEventListener('click', (e) => {
  toggleEditWindow ();
})

btnAddTask.addEventListener('click', (e) => {

    let Task = {
      name: inputNewTask.value,
      id: generateId(),
    }
    addTask(Task);
  
});

btnUpdateTask.addEventListener('click', (e) => {
  e.preventDefault();
  let idTask = idTaskEdition.innerHTML.replace('#', '');
  let Task = {
    name: inputTaskNameEdition.value,
    id: idTask
  }
  let TaskActual = document.getElementById(''+idTask+'');
  if(TaskActual) {
    let li = createTagLI(Task);
    tasksList.replaceChild(li, TaskActual);
    toggleEditWindow();
  }
  else {
    alert('Elemento HTML não encontrado')
  }
})

function generateId() {
  return Math.floor(Math.random() * 3000);
}

function addTask(Task) {
  let li = createTagLI(Task);
  tasksList.appendChild(li);
  inputNewTask.value = '';
}

function createTagLI(Task){
  let li = document.createElement('li');
  li.id = Task.id;
  
  let span = document.createElement('span');
  span.classList.add('taskText');
  span.innerHTML = Task.name;
  
  let div = document.createElement('div');
  
  let btnEdit = document.createElement('button');
  btnEdit.classList.add('btnAction');
  btnEdit.innerHTML = '<i class= "fa fa-pencil"></i>';
  btnEdit.setAttribute('onclick', 'edit('+Task.id+')');
  
  let btnExclude = document.createElement('button');
  btnExclude.classList.add('btnAction');
  btnExclude.innerHTML = '<i class="fa fa-trash"></i>';
  btnExclude.setAttribute('onclick', 'exclude('+Task.id+')');

  div.appendChild(btnEdit);
  div.appendChild(btnExclude);

  li.appendChild(span);
  li.appendChild(div);
  return li;
}

function edit(idTask) {
  let li = document.getElementById('' + idTask + '');
  if(li) {
    idTaskEdition.innerHTML = '#' + idTask;
    inputTaskNameEdition.value = li.innerText;
    toggleEditWindow();
  }
  else {
    alert('Elemento HTML não encontrado')
  }
}

function exclude(idTask){
  let confirmation = window.confirm('Tem certeza que deseja excluir este item?');
  if (confirmation) {
    let li = document.getElementById('' + idTask + '');
    if(li) {
      tasksList.removeChild(li);
    }
    else {
      alert('Elemento HTML não encontrado')
    }
  }
}

function toggleEditWindow() {
  editionWindow.classList.toggle('open');
  backgroundEditWindow.classList.toggle('open');
}