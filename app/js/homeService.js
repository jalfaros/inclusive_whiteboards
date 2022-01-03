let listColumns = [{id:1, name: 'Todo'}, {id:2, name: 'HomeWorks'}, {id:3, name: 'Done'}];

const BASEURL = 'http://localhost/inclusive_whiteboards/app/'
const idStatus = localStorage.getItem('idStatusWorkflow');

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        const resp=eval ("("+xhr.responseText+")");

        (!resp[0])? window.location.replace(`${BASEURL}html/loginForm.html`)
        : getStatusWorkflows();
        
    }
}
xhr.open('GET', `${BASEURL}php/control_sesion.php`, true);
xhr.send(null);

//Function to get the statusWorkflows
const getStatusWorkflows = () => {

    fetch(`${BASEURL}php/getStatusWorkflows.php?statusId=${idStatus}`).then(response => {
        if (response['status'] === 200) {
            return response.json();
        } else {
            return [];
        }
    }).then(data => {
        listColumns = data;
        
        listColumns.sort(function(a , b) { return a.statusIndex - b.statusIndex});

        createAllColumns();
    }).catch(err => console.log(err))
};

//Function for create culumns dinamic
const createAllColumns = () => {

    listColumns.forEach( ({statusId, statusName}) =>{
        
        const column    = createCulumnTableDinamyc(statusId, null);
        const mainTitle = createMainTitleDynamic(`${statusName} `, statusId);
        const labelName = createLabelDynamic(`${statusName} `, statusId);
        const td        = createTdTableDynamic(mainTitle, "titleColumn", statusId, createButtons("fa fa-edit"," ", statusId, editTitleColumn), createButtons('fa fa-trash'," ", statusId, deleteColumnTable));

        labelName.appendChild(createButtons("fa fa-edit"," ", statusId, editTitleColumn));
        labelName.appendChild(createButtons("fa fa-trash"," ", statusId, deleteColumnTable));
        document.getElementById("titles_tables").appendChild(td);
        column.appendChild(labelName);
    })
}

//Function to edit index the statusWorkflows
const editStatusWorkflows = (idStatus, index) => {

    fetch(`${BASEURL}php/editIndexColumn.php?statusId=${idStatus}&statusIndex=${index}`).then(response => {
        if (response['status'] === 200) {
            return response.json();
        } else {
            return [];
        }
    }).then(data => {
        //console.log(data);
    }).catch(err => console.log(err))
};

//Funtion for create Column in table
const createColumn = () => {
    
    let position =  null;

    if (listColumns.length !== 0) {
        
        position =  prompt("Please enter the position of the column to create:", "0");
        if (!position) return;
        while (position > listColumns.length +1 || position < 1 || !Number.isInteger(parseInt(position))) {
            position =  prompt("Error, that index no exist. Please enter a valid position of the column to create:", "0");
        }
    
        listColumns.forEach(({statusId, statusIndex})  =>  {
            if(statusIndex >= position ){            
                editStatusWorkflows(statusId, statusIndex +1);
            }
        });
    }

    const columnName =  prompt("Please enter column name:", "Home works");
    if(!columnName) return;


    const formData = new FormData();
    formData.append("statusIndex", position);
    formData.append("statusName", columnName);
    formData.append("flowId", idStatus); 

    fetch(`${BASEURL}php/newStatusWorkFlow.php`, {
    method: 'POST', 
    body: formData
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if(response[0]) cleanScrean();
        
    });
        

}

//Function to clean screan
const cleanScrean = () => {

    const element  = document.getElementById("titles_tables");
    const element2 = document.getElementById("body_tables");

    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }
    while (element2.firstChild) {
    element2.removeChild(element2.firstChild);
    }
    getStatusWorkflows();

    alert('Culumn created!.');
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
    column.className        = "bodyTables"
    column.setAttribute("id",`column_${id}`);
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

    const button     = document.createElement("i");
    button.innerHTML = text;
    button.className = icon;
    button.onclick   = ({target})=>{functionAction(target); return false; };
    button.setAttribute("id", id);
    button.style.borderRadius = "10px";

    return button;
}

//Funtion to edit title of table column
const editTitleColumn = ({id}) => {
    
    const title     = document.getElementById(`title_${id}`);
    const label     = document.getElementById(`labelStrong_${id}`);
    const value     = prompt("Please enter the new column name:", "Home works");
    if(!value) return;
    title.innerHTML = value;
    label.innerHTML = value;

    const data = new FormData();
    data.append('statusId', id);
    data.append('statusName', value);
    fetch(`${BASEURL}php/editStatusNameWorkflow.php`, {
    method: 'POST', 
    body: data
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if (response[0]) {
            alert('Column edited!')
        }
    });
    }

//Function to delete column from the table
const deleteColumnTable = ({id}) =>{

    document.getElementById(`column_${id}`).remove();
    document.getElementById(`td_${id}`).remove();

    
    let ready = false;
    listColumns.forEach(({statusId, statusIndex})  =>  {
         if(parseInt(id) === statusId) ready = true;         
         else if(ready) editStatusWorkflows(statusId, statusIndex -1); 
         
    });

    listColumns.splice(listColumns.findIndex((obj) => obj.statusId=== id));

    fetch(`${BASEURL}php/deleteStatusWorkflow.php?statusId=${id}`)
    .then(response => {
        if (response['status'] !== 200) {
            return;
        };

        return response.json();

    }).then(myResponse => {
        if (!myResponse[0]) {
            return;
        }
        alert("Column delted!");
    })
    .catch(error => console.log(error))

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
