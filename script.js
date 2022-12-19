let inputs = document.querySelectorAll(".form-control");
let form = document.querySelector("form");
let toast = document.querySelector(".toast");
let btnToast = document.querySelector(".toast i");


btnToast.addEventListener("click", () => {
  toast.classList.add("hide");
});

inputs.forEach((input) => {
    input.addEventListener("input",()=>{
    if(input.value.trim()!==""){
        input.nextElementSibling.classList.add("active");
    }else{
        input.nextElementSibling.classList.remove("active");
    }
    })
});


let todos;
if(localStorage.getItem("items")==null){
  todos = [];
}else {
  todos = JSON.parse(localStorage.getItem("items"));
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let taskInput = form.elements["task"];
    let taskDate = form.elements["date"];
    if(taskInput.value.trim()!==""&& taskDate.value.trim()!==""){
      let task = {
        content : taskInput.value,
        date : taskDate.value,
      };
      todos.push(task);
      localStorage.setItem("items",JSON.stringify(todos));
      createLi(task,todos.length - 1);
      taskInput.value = "";
      taskDate.value = "";
      taskInput.nextElementSibling.classList.remove("active");
    } else {
      toast.classList.remove("hide");
      setTimeout(() => {
        toast.classList.add("hide");
      }, 10000);
    }
});

function createLi(task,position = 0){
    let li = document.createElement("li");

    let spanContent = document.createElement("span");
    spanContent.textContent = task.content;

    let spanDate = document.createElement("span");
    spanDate.textContent = task.date;

    let button = document.createElement("button");
    button.className = "btn btn-danger";
    button.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
    button.setAttribute("title", "Remove Item");
    button.addEventListener("click", () => {
        if (confirm("Are you sure to delete this item ???")) {
          button.parentElement.remove();
          todos.splice(position, 1);
          localStorage.setItem("items", JSON.stringify(todos));
        }
      });
    li.append(spanContent, spanDate, button);
    document.querySelector("ul").appendChild(li);
}

function removeAllTask() {
  localStorage.removeItem("items");
  todos = [];
  document.querySelector(".task-list").innerHTML = "";
}

document.getElementById("remove-all").addEventListener("click",()=>{
  if(confirm("Are you sure to remove this"));
  removeAllTask();

})

for (let i = 0; i < todos.length; i++) {
  createLi(todos[i], i);
  console.log("Remplissage du contenu");
}
