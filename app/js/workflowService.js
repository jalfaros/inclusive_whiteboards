

const BASEURL = 'http://localhost/inclusive_whiteboards/app/php/'

userWorkflows = [];

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        const resp=eval ("("+xhr.responseText+")");

        (!resp[0])? window.location.replace('http://localhost/inclusive_whiteboards/app/html/loginForm.html')
        : getUserWorkflows();
    }
}
xhr.open('GET', `${BASEURL}control_sesion.php`, true);
xhr.send(null);


const showForm = () => {
    document.getElementById("workflowForm").style.display = "";
};


const createWorkflow = (e) => {

    e.preventDefault();

    fetch(BASEURL + 'newWorkflow.php', {
        method: 'POST',
        body: new FormData(e.target)

    }).then(response => {

        return response['status'] === 200 && response.json();

    }).then(myResponse => {
        if (myResponse.length === 0) {
            let workflowForm = document.getElementById("workflowForm")
            workflowForm.style.display = "none";
            workflowForm.reset();
            alert('Workflow created successfully');
            getUserWorkflows();
        }
    }).catch(err => {
        console.log(err);
    })
};

const getUserWorkflows = () => {

    fetch(BASEURL + 'getWorkflows.php').then(response => {
        if (response['status'] === 200) {
            return response.json();
        } else {
            return [];
        }
    }).then(data => {
        userWorkflows = data;
        createWorkflowsCards(userWorkflows);
    }).catch(err => console.log(err))
};

const createWorkflowsCards = (userWorkflows) => {

    cleanCards();

    userWorkflows.forEach(({flowId, flowName, flowDescription }) => {

        let card = document.createElement('div');
        card.className = 'workCard';
        
        let iconsDiv = document.createElement('div');
        iconsDiv.className = 'card-icon';

        let eyeIcon = document.createElement('i');
        eyeIcon.className = 'fa fa-eye';

        eyeIcon.addEventListener('click', () =>{
            seeStatesWorkflow(flowId);
        });

        let trashIcon = document.createElement('i');
        trashIcon.className = 'fa fa-trash';

        trashIcon.addEventListener('click', () => {
            deleteWorkflow(flowId);
        });

        iconsDiv.appendChild(trashIcon);
        iconsDiv.appendChild(eyeIcon);

        let cardTitle = document.createElement('h4');
        cardTitle.setAttribute('contenteditable', true);

        cardTitle.innerHTML = workflow.flowName;
        cardTitle.addEventListener('input', ( event ) => {
            onInputChange( event );
        });


        let cardDescription = document.createElement('p');
        cardTitle.setAttribute('id',`title_${flowId}`)
        cardDescription.setAttribute('id',`description_${flowId}`)

        cardTitle.contentEditable = true;
        cardDescription.contentEditable = true;
        cardTitle.innerHTML = flowName;
        cardDescription.innerHTML = flowDescription;

        card.appendChild(iconsDiv);
        card.appendChild(cardTitle);
        card.appendChild(cardDescription);

        document.getElementById('flowContainer').appendChild(card);

        document.getElementById(`title_${flowId}`).addEventListener('focusout', ({target}) => {
            const value = document.getElementById(target.id).innerText;

            const data = new FormData();

            data.append('flowId', target.id.substring(6, target.id.length));
            data.append('flowName', value);
            fetch(`${BASEURL}editTitleWorkflow.php`, {
            method: 'POST', 
            body: data
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response[0]) {
                    //alert('Title edited!')
                }
            });
        });

        document.getElementById(`description_${flowId}`).addEventListener('focusout', ({target}) => {
            const value = document.getElementById(target.id).innerText;
            const data = new FormData();
            data.append('flowId', target.id.substring(12, target.id.length));
            data.append('flowDescription', value);
            fetch(`${BASEURL}editDescriptionWorkflow.php`, {
            method: 'POST', 
            body: data
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response[0]) {
                    //alert('Description edited!')
                }
            });
            
        });

    });

}


const editTitleWorkflow = ({id}) => {
    console.log(document.getElementById(id).value);
    console.log('Hola mundo', id);
    
    const value  = document.getElementById(id).value;
    console.log(value);
    
}

const cleanCards = () => {
    let flowContainer = document.getElementById('flowContainer');
    let workCards = flowContainer.getElementsByClassName('workCard');
    while (workCards.length > 0) {
        workCards[0].remove();
    }

}


const deleteWorkflow = (cardId) => {

    fetch(BASEURL + 'deleteWorkflow.php?cardId=' + cardId)
        .then(response => {
            if (response['status'] !== 200) {
                return;
            };

            return response.json();

        }).then(myResponse => {
            if (!myResponse[0]) {
                return;
            }
            getUserWorkflows();
        })
        .catch(error => console.log(error))
};


const seeStatesWorkflow = (cardId) =>{
    // Se puede cambiar con el URI Params *** Opcional
    localStorage.setItem('idStatusWorkflow', cardId);
    window.location.href = 'http://localhost/inclusive_whiteboards/app/html/home.html';
    
}

const logOut = () => {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert("User logout");
            window.location.replace('http://localhost/inclusive_whiteboards/app/html/loginForm.html');
        }
    }
    xhr.open('GET', BASEURL+'/logOut.php', true);
    xhr.send(null);
    
}
