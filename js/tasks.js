var myData = [];

const localSave = () => {
  localStorage.setItem("tasksData", JSON.stringify(myData));
};

const myAction = () => {
  var taskItem = new Object();
  taskItem.taskInfo = document.getElementById("taskInfo").value;
  let taskDate = document.getElementById("taskDate").value;
  taskDate = taskDate.split("-");
  taskDate = `${taskDate[2]}/${taskDate[1]}/${taskDate[0]}`;
  taskItem.taskDate = taskDate;
  taskItem.taskTime = document.getElementById("taskTime").value;
  myData.push(taskItem);
  localSave();
  makeTask();
  document.getElementById("myForm").reset();
};

const deleteTask = (event) => {
  const remove = document.getElementById("tasksContainer");
  const target = event.target;
  for (let index = 0; index < remove.children.length; index++) {
    if (remove.children[index].contains(target)) {
      if (index != 0) {
        remove.children[index - 1].classList.remove("fade-in");
      }
      myData.splice(index, 1);
      remove.removeChild(remove.children[index]);
      localStorage.removeItem[index];
      localSave();
      break;
    }
  }
};

const makeTask = () => {
  document.querySelectorAll("#newTask").forEach((task) => {
    task.classList.add("hidden");
  });

  var data = "";
  myData.map((item, index) => {
    data += `<div id="newTask" class="card bg-transparent text-dark ${
      index === myData.length - 1 ? "fade-in" : ""
    }">
    <img src="../images/notebg.png" class="card-img" alt="card-img-overlay">
    <div class="card-img-overlay ">
      <span class="deleteBtn" onclick="deleteTask(event)">❌</span>
      <div class="taskContent">
        <p class="card-task">${item.taskInfo}</p>
      </div>
      <div class="date-and-time">
        <p class="card-text">${item.taskDate}</p>
        <p class="card-text">${item.taskTime}</p>
      </div>
    </div>
  </div>`;
  });
  document.getElementById("tasksContainer").innerHTML = data;
};

const checkForData = () => {
  let myTasks = JSON.parse(localStorage.getItem("tasksData"));
  if (myTasks) myData = myTasks;
};

window.addEventListener("load", function () {
  checkForData();
  makeTask();
});
