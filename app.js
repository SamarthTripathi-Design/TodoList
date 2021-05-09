const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const delAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userdata = inputBox.value; //getting data entered
  if (userdata.trim() != 0) {
    // if the input is not just empty spaces
    addBtn.classList.add("active"); //if yes then add the class
  } else {
    addBtn.classList.remove("active"); // if no then remove the class
  }
};

showTasks();

// add btn functionality
addBtn.onclick = () => {
  let userdata = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userdata);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};

//add task inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage); //transformaing json string into a js object
  }
  const pendingNumb = document.querySelector(".pendingnum");
  pendingNumb.textContent = listArr.length;
  if (listArr.length > 0) {
    delAllBtn.classList.add("active");
  } else {
    delAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += ` <li>
        ${element}
        <span onclick="deleteTask(${index});">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>`;
  });

  todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
  inputBox.value = ""; //once added leave input blank   onclick ="deleteTask(${index})";
}

// delete task;
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete the particular index

  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//delete all task
delAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
};
