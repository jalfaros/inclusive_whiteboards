

const BASEURL = 'http://localhost/inclusive_whiteboards/app/php/'

userWorkflows = [];

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
            let addForm = document.getElementById("workflowForm");
            addForm.style.display = "none";
            addForm.reset();
            getUserWorkflows();
        }
    }).catch(err => {
        console.log(err);
    })
};

const getUserWorkflows = () => {

    //Cambiar por el session ID cuando se realice el merge
    fetch(BASEURL + 'getWorkflows.php?ownerId=' + 68).then(response => {
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

    userWorkflows.forEach(workflow => {

        let card = document.createElement('div');
        card.className = 'workCard';
        

        let iconsDiv = document.createElement('div');
        iconsDiv.className = 'card-icon';

        let eyeIcon = document.createElement('i');
        eyeIcon.className = 'fa fa-eye';

        eyeIcon.addEventListener('click', () => {
            redirectToBoard( workflow.flowId );
        });

        let trashIcon = document.createElement('i');
        trashIcon.className = 'fa fa-trash';

        trashIcon.addEventListener('click', () => {
            deleteWorkflow( workflow.flowId );
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
        cardDescription.setAttribute('contenteditable', true);
        cardDescription.innerHTML = workflow.flowDescription;

        card.appendChild(iconsDiv);
        card.appendChild(cardTitle);
        card.appendChild(cardDescription);


        document.getElementById('flowContainer').appendChild(card);
    });



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

const redirectToBoard = ( cardId ) => {
    // Se concatena la parte del cardId para hacer el get en la otra vista
    window.location.href = "http://localhost/app/html/registerForm.html?cardId=" + cardId;
};


// Falta la parte de editar, input event    
const onInputChange = (e) => {

    console.log( e )

    // if ( e.data ){
    //     return;
    // }
    // // Se presiona el enter
    // console.log('Enter')
};
    