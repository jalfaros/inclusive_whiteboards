const listColumns = [{id:1, name: 'Todo'}, {id:2, name: 'HomeWorks'}, {id:3, name: 'Done'}];

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        const resp=eval ("("+xhr.responseText+")");

        //console.log(xhr.responseText, 'init');
        if(!resp[0]){
            window.location.replace('http://localhost/inclusive_whiteboards/app/html/loginForm.html');
        }else{

            createAllColumns();
        }
    }
}

xhr.open('GET', 'http://localhost/inclusive_whiteboards/app/php/control_sesion.php', true);
xhr.send(null);

//Function for create culumns dinamic
const createAllColumns = () => {

    listColumns.forEach( ({id, name}) =>{
        
        const column    = createCulumnTableDinamyc(id);
        const mainTitle = createMainTitleDynamic(name, id);
        const labelName = createLabelDynamic(name, id);
        const td        = createTdTableDynamic(mainTitle, "titleColumn", id, createButtons("&#9998;","", id, editTitleColumn), createButtons("&#10060;","", id, deleteColumnTable));

        labelName.appendChild(createButtons("&#9998;","", id, editTitleColumn));
        labelName.appendChild(createButtons("&#10060;","", id, deleteColumnTable));
        document.getElementById("titles_tables").appendChild(td);
        column.appendChild(labelName);
    })
}

//Funtion for create Column in table
const createColumn = () => {

    const column     = createCulumnTableDinamyc("column_id");
    const columnName =  prompt("Please enter column name:", "Home works");
    const mainTitle  = createMainTitleDynamic(columnName, "strong");
    const labelName  = createLabelDynamic(columnName, "strong");
    const td         = createTdTableDynamic(mainTitle, "titleColumn", "id", createButtons("&#9998;","","strong", editTitleColumn), createButtons("&#10060;","","id", deleteColumnTable));

    labelName.appendChild(createButtons("&#9998;","","strong", editTitleColumn));
    labelName.appendChild(createButtons("&#10060;","","delete", deleteColumnTable));
    document.getElementById("titles_tables").appendChild(td);
    column.appendChild(labelName);
}

//Funcion to create td dinamic
const createTdTableDynamic = (mainTitle, className, id, buttonTittleEdit, buttonDelete)=> {

    const td     = document.createElement("td");
    td.className = className;
    td.appendChild(mainTitle);
    td.appendChild(buttonTittleEdit);
    td.appendChild(buttonDelete);
    td.setAttribute("id", `td_${id}`);

    return td;
}

//Function to create the main title
const createMainTitleDynamic = (name, id) =>{
    
    const mainTitle     = document.createElement("strong");
    mainTitle.innerHTML = name;
    mainTitle.setAttribute("id","title_"+id);

    return mainTitle;
}

//function to crete columns from de table
const createCulumnTableDinamyc = (id)=>{

    const column            = document.createElement("th");
    column.style.background = "#344966";
    column.className        = "bodyTables"
    column.setAttribute("id","column_"+id);
    document.getElementById("body_tables").appendChild(column);

    return column;
}

//Function to create dinamics label to title 
const createLabelDynamic = (name, id) =>{

    const labelName      = document.createElement("label");
    const labelNameShild = document.createElement("label");
    labelName.className  = "titleInsideColumn";
    labelNameShild.innerHTML  = name;
    labelName.setAttribute("id", "label_"+id);
    labelNameShild.setAttribute("id", "labelStrong_"+id)
    labelName.appendChild(labelNameShild);

    return labelName;
}

//Function to create buttons dinamic
const createButtons = (icon, text, id, functionAction) =>{

    const button     = document.createElement("button");
    button.innerHTML = text;
    button.innerHTML = icon;
    button.onclick   = ({target})=>{functionAction(target); return false; };
    button.setAttribute("id", id);
    button.style.borderRadius = "2em";

    return button;
}

//Funtion to edit title of table column
const editTitleColumn = ({id}) => {
    
    const title     = document.getElementById(`title_${id}`);
    const label     = document.getElementById(`labelStrong_${id}`);
    const value     = prompt("Please enter the new column name:", "Home works");
    title.innerHTML = value;
    label.innerHTML = value;
}

//Function to delete column from the table
const deleteColumnTable = ({id}) =>{

    document.getElementById(`column_${id}`).remove();
    document.getElementById(`td_${id}`).remove();

    listColumns.splice(listColumns.findIndex((obj) => obj.id.toString() === id));
    alert("Column delted!");

}

//Funtion for go out of the account
const logOut = () => {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert("User logOut");
            console.log(xhr.responseText);
            window.location.replace('http://localhost/inclusive_whiteboards/app/html/loginForm.html');
        }
    }
    xhr.open('GET', 'http://localhost/inclusive_whiteboards/app/php/logOut.php', true);
    xhr.send(null);
}
