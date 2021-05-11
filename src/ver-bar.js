const createVerBar = () =>{

    const verBar = document.createElement('div');
    verBar.id = "ver-bar";

    //cretae material icons
    const iconIAdd = document.createElement('i');
    iconIAdd.classList.add('material-icons');
    iconIAdd.innerText = "add";

    const iconSDone = document.createElement('span');
    iconSDone.classList.add('material-icons');
    iconSDone.classList.add('todo-card-remove-add-icons');
    iconSDone.innerText = "done";

    const iconSArrow = document.createElement('span');
    iconSArrow.classList.add('material-icons');
    iconSArrow.innerText = "arrow_right";

    const iconSDelete = document.createElement('span');
    iconSDelete.classList.add('material-icons');
    iconSDelete.classList.add('todo-card-remove-add-icons');
    iconSDelete.innerText = "delete";

    //cretate quick todos component
    const quickTodosCard= document.createElement('div');
    quickTodosCard.id ="quick-todos-card";
    quickTodosCard.classList.add('ver-bar-card');
    quickTodosCard.appendChild(iconIAdd.cloneNode(true));
    const quickTodosCardInnerText = document.createElement('p');
    quickTodosCardInnerText.innerText = "Quick Todos"
    quickTodosCard.appendChild(quickTodosCardInnerText);

    //create project add component
    const projectAddCard = document.createElement('div');
    projectAddCard.id = "project-todos-add-card";
    projectAddCard.classList.add('ver-bar-card');

    const projectAddCardInnerText = document.createElement('p');
    projectAddCardInnerText.innerText = "Project";

    const projectAddCardProjectInput = document.createElement('div');
    projectAddCardProjectInput.id = "project-input";
    const titleInput = document.createElement('input');
    titleInput.type = "text";
    titleInput.name = "project-name-input";
    titleInput.id = "project-name-input";
    titleInput.placeholder = "Project name";
    projectAddCardProjectInput.appendChild(titleInput);
    projectAddCardProjectInput.appendChild(iconSDone.cloneNode(true));


    projectAddCard.appendChild(iconIAdd.cloneNode(true));
    projectAddCard.appendChild(projectAddCardInnerText);
    projectAddCard.appendChild(projectAddCardProjectInput);

    //append childs to verBar 
    verBar.appendChild(quickTodosCard);
    verBar.appendChild(projectAddCard);
    

    //create project todos card
    const projectTodosCard = document.createElement('div');
    projectTodosCard.classList.add('project-todos-card');
    projectTodosCard.appendChild(iconSArrow.cloneNode(true));
    const projectName = document.createElement('p');
    projectTodosCard.appendChild(projectName);
    projectTodosCard.appendChild(iconSDelete.cloneNode(true));

    const createProjectTodosCard = (pName) =>{
        const htmlProjectTodosCard = projectTodosCard.cloneNode(true);
        htmlProjectTodosCard.querySelector("p").innerText = pName;
        htmlProjectTodosCard.dataset.title = pName;
        return htmlProjectTodosCard;
    }

    return {verBar, projectAddCard, projectAddCardProjectInput, createProjectTodosCard};
}

export default createVerBar;