const createHeader = () =>{
    const header = document.createElement('div');
    header.id = "header";
    header.innerText = "Todo App";

    return header;
}

export default createHeader;