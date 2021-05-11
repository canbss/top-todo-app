//create icons
const iconIAdd = document.createElement('i');
iconIAdd.classList.add('material-icons');
iconIAdd.classList.add('cancel-icon');
iconIAdd.innerText = "add";

const iconSArrowUp = document.createElement('span');
iconSArrowUp.classList.add('material-icons');
iconSArrowUp.innerText = "arrow_upward";

const iconSArrowDown = document.createElement('span');
iconSArrowDown.classList.add('material-icons');
iconSArrowDown.innerText = "arrow_downward";

//create filter card
const createFilter = () =>{

    //cretae filter container
    const filter = document.createElement('div');
    filter.id = "filter-cards";

    //create cancel div
    const cancelDiv = document.createElement('div');
    cancelDiv.classList.add('form-cancel');
    cancelDiv.appendChild(iconIAdd);

    //create filter cards
    const prAsc = document.createElement('div');
    prAsc.classList.add('filter-card');
    prAsc.id = "filter-priority-asc";
    const prAscP = document.createElement('p');
    prAscP.innerText ="Priority";
    prAsc.appendChild(prAscP);
    prAsc.appendChild(iconSArrowUp.cloneNode(true));

    const prDesc = document.createElement('div');
    prDesc.classList.add('filter-card');
    prDesc.id = "filter-priority-desc";
    const prDescP = document.createElement('p');
    prDescP.innerText ="Priority";
    prDesc.appendChild(prDescP);
    prDesc.appendChild(iconSArrowDown.cloneNode(true));

    const dAsc = document.createElement('div');
    dAsc.classList.add('filter-card');
    dAsc.id = "filter-date-asc";
    const dAscP = document.createElement('p');
    dAscP.innerText ="Due date";
    dAsc.appendChild(dAscP);
    dAsc.appendChild(iconSArrowUp.cloneNode(true));

    const dDesc = document.createElement('div');
    dDesc.classList.add('filter-card');
    dDesc.id = "filter-date-desc";
    const dDescP = document.createElement('p');
    dDescP.innerText ="Due date";
    dDesc.appendChild(dDescP);
    dDesc.appendChild(iconSArrowDown.cloneNode(true));

    //apend elements to filter container
    const elements = [cancelDiv, prAsc, prDesc, dAsc, dDesc];
    elements.forEach(element =>{
        filter.appendChild(element);
    })

    return filter;

}

export default createFilter;