

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
            document.getElementById("workflowForm").style.display = "none";
            getUserWorkflows();
        }
    }).catch(err => {
        console.log(err);
    })
};

const getUserWorkflows = () => {

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
        //card.setAttribute('id', workflow.flowId);


        let iconsDiv = document.createElement('div');
        iconsDiv.className = 'card-icon';

        let eyeIcon = document.createElement('i');
        eyeIcon.className = 'fa fa-eye';

        let trashIcon = document.createElement('i');
        trashIcon.className = 'fa fa-trash';

        trashIcon.addEventListener('click', () => {
            deleteWorkflow(workflow.flowId);
        });

        iconsDiv.appendChild(trashIcon);
        iconsDiv.appendChild(eyeIcon);

        let cardTitle = document.createElement('h4');
        let cardDescription = document.createElement('p');
        cardTitle.innerHTML = workflow.flowName;
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
}
