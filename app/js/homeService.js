let listColumns = [{ id: 1, name: 'Todo' }, { id: 2, name: 'HomeWorks' }, { id: 3, name: 'Done' }];

const BASEURL = 'http://localhost/inclusive_whiteboards/app/'
const idStatus = localStorage.getItem('idStatusWorkflow');

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        const resp = eval("(" + xhr.responseText + ")");

        (!resp[0]) ? window.location.replace(`${BASEURL}html/loginForm.html`)
            : getStatusWorkflows();

    }
}
xhr.open('GET', `${BASEURL}php/control_sesion.php`, true);
xhr.send(null);

//Function to get the statusWorkflows
const getStatusWorkflows = () => {

    document.getElementById('titles_tables').innerHTML = '';    
    document.getElementById('body_tables').innerHTML = '';

    fetch(`${BASEURL}php/getStatusWorkflows.php?statusId=${idStatus}`).then(response => {
        if (response['status'] === 200) {
            return response.json();
        } else {
            return [];
        }
    }).then(data => {
        listColumns = data;
        //console.log(data)
        listColumns.sort(function (a, b) { return a.statusIndex - b.statusIndex });

        createAllColumns();
    }).catch(err => console.log(err))
};

//Function for create culumns dinamic
const createAllColumns = () => {

    // El status index funcionará para manejar la posición de las notas y también para setear la posición de los drags
    listColumns.forEach(({ statusId, statusName, cards }) => {


        const column = createCulumnTableDinamyc(statusId, cards);
        const mainTitle = createMainTitleDynamic(`${statusName} `, statusId);
        const labelName = createLabelDynamic(`${statusName} `, statusId);
        const td = createTdTableDynamic(mainTitle, "titleColumn", statusId, createButtons("fa fa-edit", " ", statusId, editTitleColumn), createButtons('fa fa-trash', " ", statusId, deleteColumnTable), createButtons("fa fa-plus-circle", " ", statusId, addStickyNote));

        labelName.appendChild(createButtons("fa fa-edit", " ", statusId, editTitleColumn));
        labelName.appendChild(createButtons("fa fa-trash", " ", statusId, deleteColumnTable));
        labelName.appendChild(createButtons("fa fa-plus-circle", " ", statusId, addStickyNote));
        document.getElementById("titles_tables").appendChild(td);
        column.appendChild(labelName);

        // column.innerHTML = "<p>Hola perros</p>"
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

    let position = null;

    if (listColumns.length !== 0) {

        position = prompt("Seleccione la posición donde desea agregar la columna:", "");
        if (!position) return;
        while (position > listColumns.length + 1 || position < 1 || !Number.isInteger(parseInt(position))) {
            position = prompt("La posición es mayor a las actuales, por favor escoja una posición e intente de nuevo", "0");
        }

        listColumns.forEach(({ statusId, statusIndex }) => {
            if (statusIndex >= position) {
                editStatusWorkflows(statusId, statusIndex + 1);
            }
        });
    }

    const columnName = prompt("Ingrese el nombre de la columna:", "");
    if (!columnName) return;


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
            if (response[0]) cleanScrean();

        });


}

//Function to clean screan
const cleanScrean = () => {

    const element = document.getElementById("titles_tables");
    const element2 = document.getElementById("body_tables");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    while (element2.firstChild) {
        element2.removeChild(element2.firstChild);
    }
    getStatusWorkflows();

    alert('Culumna creada correctemente.');
}

//Funcion to create td dinamic
const createTdTableDynamic = (mainTitle, className, id, buttonTittleEdit, buttonDelete, addNoteButton) => {

    const td = document.createElement("td");
    td.className = className;
    td.appendChild(mainTitle);
    td.appendChild(buttonTittleEdit);
    td.appendChild(buttonDelete);
    td.appendChild(addNoteButton);
    td.setAttribute("id", `td_${id}`);

    return td;
}

//Function to create the main title
const createMainTitleDynamic = (name, id) => {

    const mainTitle = document.createElement("strong");
    mainTitle.innerHTML = name;
    mainTitle.setAttribute("id", "title_" + id);

    return mainTitle;
}

//function to crete columns from de table
const createCulumnTableDinamyc = (id, columnCards) => {

    const column = document.createElement("th");
    column.className = "bodyTables"
    column.setAttribute("id", `column_${id}`);
    //Agregar la parte de los draggables de las notas
    const stickyContainer = document.createElement("div");
    stickyContainer.className = "stickyContainer";
    stickyContainer.setAttribute("id", id);

    stickyContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    stickyContainer.addEventListener('drop', (e) => {
        //Información de donde estaba el sticky 

        const stickyInfo = JSON.parse( e.dataTransfer.getData("text") );

        if ( e.target.id === stickyInfo.parent ) return;

        stickyContainer.appendChild( document.getElementById( stickyInfo.id ) );
        stickyContainer.className = 'stickyContainer';

        //Sigue la conexión con la base de datos
    
    });

    stickyContainer.addEventListener('dragenter', () => {
        stickyContainer.className += ' dragOver'
    });

    stickyContainer.addEventListener('dragleave', () => {
        stickyContainer.className = 'stickyContainer';
    });




    if ( Object.keys( columnCards[0] ).length !== 0 ) {

        columnCards.forEach(card => {
            let note = document.createElement('div');
            note.className = "stickyNote"
            note.setAttribute("id", card.stickyId)
            note.setAttribute('draggable', true)
       
            note.addEventListener('dragstart', (e) => {
                const sourceInfo = {
                    'id': e.target.id,
                    'parent': e.path[1].id
                }
                e.dataTransfer.setData("text/plain", JSON.stringify( sourceInfo ));
                note.className += ' onDragCard'
            });
            
            note.addEventListener('dragend', (e) => {
                //console.log( e )
            });


            let stickyDesDiv = document.createElement('div');
            stickyDesDiv.className = "stickyDescription";

            let stickyDesc = document.createElement('p');
            stickyDesc.className = "desc";
            stickyDesc.innerHTML = card.stickyDescription;
            stickyDesc.setAttribute('contenteditable', true);

            stickyDesDiv.appendChild(stickyDesc);
            note.appendChild(stickyDesDiv);
            stickyContainer.appendChild(note);
        })
    }


    column.appendChild(stickyContainer);
    // Se devuelve toda la columna
    document.getElementById("body_tables").appendChild(column);

    return column;
}

//Function to create dinamics label to title 
const createLabelDynamic = (name, id) => {

    const labelName = document.createElement("label");
    const labelNameShild = document.createElement("label");
    labelName.className = "titleInsideColumn";
    labelNameShild.innerHTML = name;
    labelName.setAttribute("id", "label_" + id);
    labelNameShild.setAttribute("id", "labelStrong_" + id)
    labelName.appendChild(labelNameShild);

    return labelName;
}

//Function to create buttons dinamic
const createButtons = (icon, text, id, functionAction) => {

    const button = document.createElement("i");
    button.innerHTML = text;
    button.className = icon;
    button.onclick = ({ target }) => { functionAction(target); return false; };
    button.setAttribute("id", id);
    button.style.borderRadius = "10px";

    return button;
}

//Funtion to edit title of table column
const editTitleColumn = ({ id }) => {

    const title = document.getElementById(`title_${id}`);
    const label = document.getElementById(`labelStrong_${id}`);
    const value = prompt("Por favor, ingrese el nombre de la columna:", "Pendientes");
    if (!value) return;
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
                alert('Columna editada correctamente!')
            }
        });
}

//Function to delete column from the table
const deleteColumnTable = ({ id }) => {

    document.getElementById(`column_${id}`).remove();
    document.getElementById(`td_${id}`).remove();


    let ready = false;
    listColumns.forEach(({ statusId, statusIndex }) => {
        if (parseInt(id) === statusId) ready = true;
        else if (ready) editStatusWorkflows(statusId, statusIndex - 1);

    });

    listColumns.splice(listColumns.findIndex((obj) => obj.statusId === id));

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
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert("Se ha cerrado la sesión correctamente");
            console.log(xhr.responseText);
            window.location.replace('http://localhost/inclusive_whiteboards/app/html/loginForm.html');
        }
    }
    xhr.open('GET', 'http://localhost/inclusive_whiteboards/app/php/logOut.php', true);
    xhr.send(null);

}


// Jose Ignacio Alfaro - 02/01/2022 --- Drag and Drop 

const addStickyNote = (columnElement) => {


    const stickyDescription = prompt("Ingrese la descripción de la nota: ", "");
    if (!stickyDescription) return;

    var formData = new FormData();
    formData.append('statusId', columnElement.id);
    formData.append('stickyDescription', stickyDescription);

    fetch(`${BASEURL}php/addNote.php`, {
        method: 'POST',
        body: formData

    }).then ( response => {
        if ( !response['status'] === 200 ){
            return;
        }

        return response.json( );
    }).then( myData => {
        alert( myData.Message );
        getStatusWorkflows();
    }).catch(err => {
        console.log('Error ', err)
    });



};  

