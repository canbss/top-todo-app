//create icons
const iconICancel = document.createElement('i');
iconICancel.classList.add('material-icons');
iconICancel.classList.add('cancel-icon');
iconICancel.innerText = "add";

//create function for displaying notes
const createNotes = (note) =>{

    //create note container
    const noteCard = document.createElement('div');
    noteCard.id = "display-notes";

    //create elements
    const cancelDiv = document.createElement('div');
    cancelDiv.classList.add('form-cancel');
    cancelDiv.appendChild(iconICancel);
    const noteP = document.createElement('p');
    noteP.innerText = note;

    //append elements
    noteCard.appendChild(cancelDiv);
    noteCard.appendChild(noteP);

    return noteCard;
}

export default createNotes;