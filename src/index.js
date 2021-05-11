import createHeader from "./header.js"
import createVerBar from "./ver-bar.js"
import createBoard from "./board.js"
import createTodoAddCard from "./todo-add-card"
import createFilter from "./fiter-comp"
import createNotes from "./disp-notes"
import {compareAsc, compareDesc} from 'date-fns'

//get components
const verBarObj = createVerBar();
const boardObj = createBoard();
const header = createHeader();
const verBar = verBarObj.verBar;
const projectAddCard = verBarObj.projectAddCard;
const projectAddCardProjectInput = verBarObj.projectAddCardProjectInput;
const board = boardObj.board;
const todoAddCard = createTodoAddCard();
const filter = createFilter();
const container = document.querySelector('#container');
const notes = createNotes("");
const comps = [header, verBar, board, todoAddCard, filter, notes];

//create project object
const project = (title) =>{

    let _title = title;

    const getProjectTitle = () =>{
        return _title;
    }

    let todos = [];

    const addTodo = (todo) =>{
        todos.push(todo);
    }

    const getTodos = () =>{
        return todos;
    }

    return {getProjectTitle, addTodo, getTodos};
}
// get the values if the local storage is not empty
let projects = [];
if(localStorage.projects != undefined){
    //should convert projects array to old form which contains project objects 
    let projectsFromStorage = JSON.parse(localStorage.projects);
    projectsFromStorage.forEach(localProject =>{
        let newProject = project(localProject.title);
        (localProject.todos).forEach(todo =>{
            todo.dueDate = new Date(todo.dueDate);
            newProject.addTodo(todo);
        })
        projects.push(newProject);
    });
    //add project names to the vertical bar
    projects.forEach(project =>{
        if(project.getProjectTitle() != "Quick todos"){
            const newProjectCard = verBarObj.createProjectTodosCard(project.getProjectTitle());
            newProjectCard.querySelector("p").addEventListener('click', () =>{
                todoAddCard.style.display = "none";
                const filterCard = document.querySelector('#filter-cards');
                filterCard.style.visibility = "hidden";
                showBoardForProject(project.getProjectTitle());
            })
            //add delete function
            const deleteButton = newProjectCard.querySelector(".todo-card-remove-add-icons");
            deleteButton.addEventListener('click', ()=>{
                //remove the project from DOM
                deleteButton.parentElement.remove();
                //remove the project from the projects array
                projects.forEach(project =>{
                    if(project.getProjectTitle() == deleteButton.parentElement.dataset.title){
                        const index = projects.indexOf(project);
                        projects.splice(index,1);
                        arrangeLocalStorage();
                    }
                })
                if(boardObj.getBoardTitle() == deleteButton.parentElement.dataset.title){
                    board.style.visibility = "hidden";
                }
            })
            verBar.appendChild(newProjectCard);
        }
    })
    //add functionality to project names for displaying todos

    //cards must have the cardfuncs such as delete done 
}else{
    projects = [project('Quick todos')];
}

//create todo object
const todo = (priority, title, note, dueDate) =>{
    return {priority, title, note, dueDate};
}

//render all components
const render = (comps) =>{
    comps.forEach(comp =>{
        container.appendChild(comp);
    })
}

// create array for saving projects in local storage
// saving raw projects array results error so that new array
// is necessatiy with this function.
const arrangeLocalStorage = () =>{
    let arr = [];
    projects.forEach(project =>{
        let newProject = {
            title : project.getProjectTitle(),
            todos : project.getTodos()
        }
        arr.push(newProject);
    })
    localStorage.setItem('projects', JSON.stringify(arr));
}

//show board function for event listener
const showBoardForProject = (title) =>{
    //first clear board
    const todosToDelete = board.querySelectorAll('.todo-card');
    todosToDelete.forEach(card =>{
        card.remove();
    })
    boardObj.setBoardTitle(title);
    //search projects array and find the corresponding project then append todos to the project
    projects.forEach(project =>{
        if(project.getProjectTitle() == title){
            let todos = project.getTodos();
            todos.forEach(todo =>{
                board.appendChild(boardObj.createTodoCard(todo));
            })
        }
    })

    board.style.visibility = "visible";
    //add function here to display todos for a spesific project name 
    const buttons = Array.from(board.querySelectorAll('.todo-card-remove-add-icons'));
    buttons.forEach(button =>{
        button.addEventListener('click', CardFuncs);
    })
}

//function for adding new projects
const newProjectToVerBar = () =>{
    
    //hide input component
    projectAddCardProjectInput.style.display = "none";
    
    //get project title
    let title = (projectAddCardProjectInput.querySelector("input").value == "")  ? `project ${projects.length+1}` : projectAddCardProjectInput.querySelector("input").value;
    
    //push it to the projects library
    projects.push(project(title));
    arrangeLocalStorage();
    
    //show it in the vertical bar html element
    const newProjectCard = verBarObj.createProjectTodosCard(title);
    verBar.appendChild(newProjectCard);
    
    //show todos when a project name is clicked
    //call showBoardForProject function for each project when clicked
    const projectTitles = Array.from(verBar.querySelectorAll('.project-todos-card'));
    projectTitles.forEach(title => {
        title.querySelector("p").addEventListener('click', () =>{
            todoAddCard.style.display = "none";
            const filterCard = document.querySelector('#filter-cards');
            filterCard.style.visibility = "hidden";
            showBoardForProject(title.querySelector("p").innerText);
        })
    })

    //add functionality to project delete icons
    const deleteButton = newProjectCard.querySelector(".todo-card-remove-add-icons");
    deleteButton.addEventListener('click', ()=>{
        //remove the project from DOM
        deleteButton.parentElement.remove();
        //remove the project from the projects array
        projects.forEach(project =>{
            if(project.getProjectTitle() == deleteButton.parentElement.dataset.title){
                const index = projects.indexOf(project);
                projects.splice(index,1);
                arrangeLocalStorage();
            }
        })
        if(boardObj.getBoardTitle() == deleteButton.parentElement.dataset.title){
            board.style.visibility = "hidden";
        }
    })
}

const CardFuncs = (e) =>{
    //show notes 
    if(e.target.innerText == "more_horiz"){
        projects.forEach(project =>{
            if(project.getProjectTitle() == boardObj.getBoardTitle()){
                let todos = project.getTodos();
                todos.forEach(todo =>{
                    if(todo.title == e.target.dataset.title){
                        notes.lastElementChild.innerText = todo.note;
                        const iconPosition = (e.target).getBoundingClientRect();
                        notes.style.top = `${iconPosition.top}px`;
                        notes.style.left = `${iconPosition.left}px`;
                        notes.style.visibility = "visible";
                        //add functionality to cancel button
                        const cancelIcon = notes.querySelector('.material-icons');
                        cancelIcon.addEventListener('click', ()=>{
                            notes.style.visibility = "hidden";
                        })
                    }
                })
            }
        })
    }
    //delete the card and the todo from the project object
    if(e.target.innerText == "delete"){
        projects.forEach(project =>{
            if(project.getProjectTitle() == boardObj.getBoardTitle()){
                let todos = project.getTodos();
                todos.forEach(todo =>{
                    if(todo.title == e.target.dataset.title){
                        //remove todo from board and object
                        const index = todos.indexOf(todo);
                        todos.splice(index,1);
                        arrangeLocalStorage();
                        const card = e.target.parentElement.parentElement;
                        card.remove();
                    }
                })
            }
        })
    // alter the done property of a todo and change background color of parent card element
    }if(e.target.innerText == "done"){
        const card = e.target.parentElement.parentElement;
        let checkClass = Array.from(card.classList).some(c => {
            return c == "done-card";
        });
        if(checkClass){
            card.classList.remove("done-card");
            projects.forEach(project =>{
                if(project.getProjectTitle() == boardObj.getBoardTitle()){
                    let todos = project.getTodos();
                    todos.forEach(todo =>{
                        if(todo.title == e.target.dataset.title){
                            todo.done = false;
                            arrangeLocalStorage();
                        }
                    })
                }
            })
        }else{
            card.classList.add("done-card");
            projects.forEach(project =>{
                if(project.getProjectTitle() == boardObj.getBoardTitle()){
                    let todos = project.getTodos();
                    todos.forEach(todo =>{
                        if(todo.title == e.target.dataset.title){
                            todo.done = true;
                            arrangeLocalStorage();
                        }
                    })
                }
            })
        }
    }
}

const createNewTodo = () =>{
    //close filter section if it is open
    let title = todoAddCard.querySelector('#title-add-input').value;
    let note = todoAddCard.querySelector('#note-add-input').value;
    let dueDate  = new Date(todoAddCard.querySelector('#due-date-add-input').value);
    let priority;
    let newTodo;
    let done = false;
    //get priority value
    const radios = (todoAddCard.querySelector('#priority-radios')).getElementsByTagName('input');
    for(let i = 0; i<radios.length; i++){
        if(radios[i].checked){
            priority = radios[i].value;
            break;
        }else{
            priority = "moderate";
        }
    }
    if(title != "" && note != "" && dueDate != ""){
        newTodo = todo(priority, title, note, dueDate, done);
        //add new todo to the project object
        projects.forEach(project =>{
            if(project.getProjectTitle() == boardObj.getBoardTitle()){
                project.addTodo(newTodo);
            }
        })
    }
    console.log(projects);
    showBoardForProject(boardObj.getBoardTitle());
    arrangeLocalStorage();

    //add listener for threedot remove and check buttons
    const buttons = Array.from(board.querySelectorAll('.todo-card-remove-add-icons'));
    buttons.forEach(button =>{
        button.addEventListener('click', CardFuncs);
    })
}

const filterCards = () =>{
    //Close add card if it is open.
    if(todoAddCard.style.display == "flex"){
        todoAddCard.style.display == "none";
    }
    const filterCard = document.querySelector('#filter-cards');
    filterCard.style.visibility = "visible";
    filterCard.querySelector('.form-cancel').lastElementChild.addEventListener('click', () =>{
        filterCard.style.visibility = "hidden";
    })
    //Get the todos
    let todos;
    projects.forEach(project => {
        if(project.getProjectTitle() == boardObj.getBoardTitle()){
            todos = project.getTodos();
        }
    });
    //add filter functions for filter cards
    //Sort by ascending priority
    filterCard.querySelector('#filter-priority-asc').addEventListener('click', () =>{
        todos.sort((a,b) =>{
            if(a.priority == "high" && b.priority == "high"){
            }else if(a.priority == "high"){
                return -1;
            }else if(a.priority == "high" && b.priority == "high"){
            }else if(a.priority == "moderate" && b.priority == "low"){
                return -1;
            }else if(a.priority == "moderate" && b.priority == "moderate"){
            }else if(a.priority == "low" && b.priority == "low"){
            }else{
                return 1;
            }
        })
        showBoardForProject(boardObj.getBoardTitle());
    })
    //Sort by descending priority
    filterCard.querySelector('#filter-priority-desc').addEventListener('click', ()=>{
        todos.sort((a,b) =>{
            if(a.priority == "high" && b.priority == "high"){
            }else if(a.priority == "high"){
                return 1;
            }else if(a.priority == "high" && b.priority == "high"){
            }else if(a.priority == "moderate" && b.priority == "low"){
                return 1;
            }else if(a.priority == "moderate" && b.priority == "moderate"){
            }else if(a.priority == "low" && b.priority == "low"){
            }else{
                return -1;
            }
        })
        showBoardForProject(boardObj.getBoardTitle());
    })
    //Sort by ascending date
    filterCard.querySelector('#filter-date-asc').addEventListener('click', () =>{
        todos.sort((a,b) =>{
            return compareDesc(a.dueDate, b.dueDate);
        });
        showBoardForProject(boardObj.getBoardTitle());
    });
    //Sort by descending date
    filterCard.querySelector('#filter-date-desc').addEventListener('click', () =>{
        todos.sort((a,b) =>{
            return compareAsc(a.dueDate, b.dueDate);
        });
        showBoardForProject(boardObj.getBoardTitle());
    });
}

render(comps);

//add listener to project add card
(projectAddCard.querySelector("p")).addEventListener('click', () =>{
    projectAddCardProjectInput.style.display = (projectAddCardProjectInput.style.display == "" || projectAddCardProjectInput.style.display == "none" ) ? "flex" : "none";
})

//create new project and to projects array
projectAddCardProjectInput.querySelector("span").addEventListener('click', newProjectToVerBar);

//show board for quick todos as well
verBar.querySelector('#quick-todos-card').lastElementChild.addEventListener('click', () =>{
    todoAddCard.style.display = "none";
    const filterCard = document.querySelector('#filter-cards');
    filterCard.style.visibility = "hidden";
    showBoardForProject('Quick todos');
})

//show new todo card in the container
const addTodoBtn = board.querySelector('#board-header-add-icon');
addTodoBtn.addEventListener('click', function(){
    const filterCard = document.querySelector('#filter-cards');
    if(filterCard.style.visibility == "visible"){
        filterCard.style.visibility = "hidden";
    }
    //get icon position
    const iconPosition = this.getBoundingClientRect();
    //set form position
    todoAddCard.style.display = "flex";
    todoAddCard.style.top = `${iconPosition.top}px`;
    todoAddCard.style.left = `${iconPosition.left}px`;
})

//event listener for closing the add new todo card
todoAddCard.firstElementChild.firstElementChild.addEventListener('click', ()=>{
    todoAddCard.style.display = "none";
})

//create new todo
todoAddCard.lastElementChild.addEventListener('click', createNewTodo);

//event listener for filter button
board.querySelector('#board-header-filter-icon').addEventListener('click', filterCards);
