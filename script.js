// const { useActionState } = require("react");

const taskinput = document.getElementById("taskInput");
// here document represents the current html document
//we store the current selected elements in variables..
const addbtn = document.getElementById("addbtn")
const tasklist = document.getElementById("taskList")
/* 
getElementById -- used to select an html Element
addEventListener -- mtlb koi user agar kuch krta hnn toh usse detect krna 
push() -- add an element into the Array
splice() -- remove an element 
foreach() -- iterate through tasks
JSON.stringify() -- convert array into string
JSON.parse() -- convert string into array
localStorage -- store data into browser


 */

// let tasks = []; -- creates an empty array 
/* let tasks = [
    {
        text : "complete dsa",
        completed : false
    },
    {
        text: "learn html",
        completed: true 
    }
]; -- storing 2 properties for each task taskname and completion status */
let tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
// local storage is a browser feature that allows us to save data as key value pairs
function savetasks(){
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}
// getItem removeItem setItem 
function displaytasks(){
    tasklist.innerHTML = ""; //innerhtml represents html content inside an element
    //we are using it because whenever we are calling this function we want the whole list to apper again and we remove the previous list so that elemtnst do not get duplicated

    tasks.forEach((task , index) => {   //this is simply a for loop for arrays in js
        const li = document.createElement("li");
        //the above line creates a new html ele dynamically 
        const span = document.createElement("span");
        span.textContent = task.text;

        if(task.completed){
            span.classList.add("completed");
        }

        span.addEventListener("click" , () =>{
          //  task.completed != task.completed;
            tasks[index].completed = !tasks[index].completed;
            savetasks();
            displaytasks();
        });

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "delete";
        deletebtn.addEventListener("click" , () => {
            tasks.splice(index , 1);
            savetasks();
            displaytasks();
        });

        li.appendChild(span);
        li.appendChild(deletebtn);

        tasklist.appendChild(li);
    });
}
addbtn.addEventListener("click" , ()=> {
    const text = taskinput.value.trim();

    if(text === ""){
        alert("please enter a task");
        return;
    }

    tasks.push({
        text: text ,
        completed: false 
    });

    savetasks();
    displaytasks();

    taskinput.value = "";
});

taskinput.addEventListener("keydown" , (event) =>{
    if (event.key == "Enter"){
        addbtn.click();
    }
});

displaytasks();

/*
javascript notes --
selecting html elements 
document.getElementById("taskinput")

*/


/* 
flow of program --
1. first declare all the dom

*/