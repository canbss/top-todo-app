import format from 'date-fns/format';

const createBoard = () =>{

    //Create icons
    const iconIAdd = document.createElement('i');
    iconIAdd.classList.add('material-icons');
    iconIAdd.innerText = "add";
    iconIAdd.id = "board-header-add-icon";

    const iconSFilter = document.createElement('span');
    iconSFilter.classList.add('material-icons');
    iconSFilter.id = "board-header-filter-icon";
    iconSFilter.innerText = "filter_alt";

    const iconSCircle = document.createElement('span');
    iconSCircle.classList.add('material-icons');
    iconSCircle.classList.add('board-info');
    iconSCircle.id = "todo-circ";
    iconSCircle.innerText = "circle";

    const iconSThreedot = document.createElement('span');
    iconSThreedot.classList.add('material-icons');
    iconSThreedot.classList.add('board-info');
    iconSThreedot.classList.add('todo-card-remove-add-icons');
    iconSThreedot.innerText = "more_horiz";

    const iconSDelete = document.createElement('span');
    iconSDelete.classList.add('material-icons');
    iconSDelete.classList.add('todo-card-remove-add-icons');
    iconSDelete.innerText = "delete";

    const iconSDone = document.createElement('span');
    iconSDone.classList.add('material-icons');
    iconSDone.classList.add('todo-card-remove-add-icons');
    iconSDone.innerText = "done";

    //Create board container
    const board = document.createElement('div');
    board.id="board";

    //Create board header
    const boardHeader = document.createElement('div');
    boardHeader.id  = "board-header";
    const boardHeaderTitle = document.createElement('div');
    boardHeaderTitle.id = "board-title";
    const boardHeaderIcons = document.createElement('div');
    boardHeaderIcons.id = "board-icons";
    boardHeaderIcons.appendChild(iconIAdd.cloneNode(true));
    boardHeaderIcons.appendChild(iconSFilter.cloneNode(true));
    boardHeader.appendChild(boardHeaderTitle);
    boardHeader.appendChild(boardHeaderIcons);

    //create function for changing header title
    const setBoardTitle = (pName) =>{
        boardHeaderTitle.innerText = pName;
        
    }

    const getBoardTitle = () =>{
        return boardHeaderTitle.innerText;
    }

    //Create board info bar
    const boardInfos = document.createElement('div');
    const boardInfo = document.createElement('div');
    boardInfos.id = "board-infos";
    const infos = ['Priority', 'Title', 'Note', 'Due date', 'Change'];
    infos.forEach(info =>{
        let cloneBoardInfo = boardInfo.cloneNode(true);
        cloneBoardInfo.classList.add('board-info');
        cloneBoardInfo.innerText = info;
        boardInfos.appendChild(cloneBoardInfo);
    })

    //Create Todo card
    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');
    const taskTitle = document.createElement('p');
    taskTitle.id = "todo-title";
    taskTitle.classList.add('board-info');
    const datePart = document.createElement('p');
    datePart.id = "date";
    datePart.classList.add('board-info');
    const todoRemoveCheck = document.createElement('div');
    todoRemoveCheck.id = "todo-remove-check";
    todoRemoveCheck.classList.add('board-info');
    todoRemoveCheck.appendChild(iconSDelete);
    todoRemoveCheck.appendChild(iconSDone);

    //function for creating new todo cards
    const createTodoCard = ({priority, title, note, dueDate, done}) =>{
        const htmlTodoCard = todoCard.cloneNode(true);
        let circleIcon = iconSCircle.cloneNode(true);
        if(priority == "high"){
            circleIcon.style.color = "#ae3535";
        }else if(priority == "moderate"){
            circleIcon.style.color = "#3f3fec";
        }else{
            circleIcon.style.color = "#368836";
        }

        if(done){
            htmlTodoCard.classList.add('done-card');
        }

        taskTitle.innerText = title;
        datePart.innerText = format(dueDate, "yyyy-MM-dd");
        iconSThreedot.dataset.title = title;
        iconSDelete.dataset.title = title;
        iconSDone.dataset.title = title;

        htmlTodoCard.appendChild(circleIcon);
        htmlTodoCard.appendChild(taskTitle.cloneNode(true));
        htmlTodoCard.appendChild(iconSThreedot.cloneNode(true));
        htmlTodoCard.appendChild(datePart.cloneNode(true));
        htmlTodoCard.appendChild(todoRemoveCheck.cloneNode(true));

        return htmlTodoCard;
    }

    //add board header and infos to board component 
    board.appendChild(boardHeader);
    board.appendChild(boardInfos);

    return {board, setBoardTitle, getBoardTitle, createTodoCard};
}

export default createBoard;