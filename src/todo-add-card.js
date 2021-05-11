//create icons
const iconICancel = document.createElement('i');
iconICancel.classList.add('material-icons');
iconICancel.classList.add('cancel-icon');
iconICancel.innerText = "add";

const iconSDone = document.createElement('span');
iconSDone.classList.add('material-icons');
iconSDone.innerText = "done";

//create form for adding new todo
const createTodoAddCard = () =>{

    //create form container
    const card = document.createElement('form');
    card.id = "add-todo-card";
    card.action = "";
    card.setAttribute("onsubmit", "return false");

    //create cancel div
    const cancelDiv = document.createElement('div');
    cancelDiv.classList.add('form-cancel');
    cancelDiv.appendChild(iconICancel);

    //create title input
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'title-add-input');
    titleInputLabel.innerText = "Title";
    const titleInput = document.createElement('input');
    titleInput.type = "text";
    titleInput.name = "title-add-input";
    titleInput.id = "title-add-input";
    titleInput.required = true;
    titleInput.placeholder = "Title";

    //create note input
    const noteInputLabel = document.createElement('label');
    noteInputLabel.setAttribute('for', "note-add-input");
    noteInputLabel.innerText = "Note";
    const noteInput = document.createElement('textarea');
    noteInput.name = "note-add-input";
    noteInput.id = "note-add-input";
    noteInput.required = true;

    //create due date input
    const dateInputLabel = document.createElement('label');
    dateInputLabel.setAttribute("for","due-date-add-input");
    dateInputLabel.innerText = "Due date";
    const dateInput = document.createElement('input');
    dateInput.type = "date";
    dateInput.name = "due-date-add-input";
    dateInput.id = "due-date-add-input";
    dateInput.required = true;

    //create div for priority radio buttons
    const priorityRadioDiv = document.createElement('div');
    priorityRadioDiv.id = "priority-radios";
    const highPLabel = document.createElement('label');
    highPLabel.setAttribute("for","high-p");
    highPLabel.innerText = "High";
    const highPInput = document.createElement('input');
    highPInput.type = "radio";
    highPInput.name = "priority";
    highPInput.id = "high-p";
    highPInput.value = "high";
    const lowPLabel = document.createElement('label');
    lowPLabel.setAttribute("for", "low-p");
    lowPLabel.innerText = "Low";
    const lowPInput = document.createElement('input');
    lowPInput.type = "radio";
    lowPInput.name = "priority";
    lowPInput.id = "low-p";
    lowPInput.value = "low";
    const moderatePLabel = document.createElement('label');
    moderatePLabel.setAttribute("for","moderate-p");
    moderatePLabel.innerText = "Moderate";
    const moderatePInput = document.createElement('input');
    moderatePInput.type = "radio";
    moderatePInput.name = "priority";
    moderatePInput.id = "moderate-p";
    moderatePInput.value = "moderate";
    priorityRadioDiv.appendChild(highPLabel);
    priorityRadioDiv.appendChild(highPInput);
    priorityRadioDiv.appendChild(moderatePLabel);
    priorityRadioDiv.appendChild(moderatePInput);
    priorityRadioDiv.appendChild(lowPLabel);
    priorityRadioDiv.appendChild(lowPInput);

    //create submit button
    const sButton = document.createElement('button');
    sButton.type = "submit";
    sButton.appendChild(iconSDone);

    //append elements to the card
    const elements = [cancelDiv, titleInputLabel, titleInput, noteInputLabel, noteInput, dateInputLabel, dateInput, priorityRadioDiv, sButton];
    elements.forEach(element =>{
        card.appendChild(element);
    })

    return card;
}

export default createTodoAddCard;