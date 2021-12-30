

const BASEURL = 'http://localhost/inclusive_whiteboards/app/php/'

var userWorkflows = [];

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
    })
};

const getUserWorkflows = async () => {
    //Falta obtener el user ID de los datos de inicio de sesión ----- jalfaros = 68
    response = await fetch(BASEURL + 'getWorkflows.php?ownerId=' + 68);
    workflowsData = await response.json();
    userWorkflows = workflowsData.length != 0 ? workflowsData : [];
    console.log(userWorkflows);
    createWorkflowsCards();
};

const createWorkflowsCards = () => {



    userWorkflows.forEach( workflow => {
        
        card = document.createElement('div');
        card.className = 'workCard';
        card.setAttribute('Id', workflow.flowId);

        document.getElementById('flowContainer').appendChild( card );
        
        cardTitle = document.createElement('h3');
        cardDescription = document.createElement('p');
        cardTitle.innerHTML = workflow.flowName;
        cardDescription.innerHTML = workflow.flowDescription;
        
        card.appendChild(cardTitle);
        card.appendChild(cardDescription);

    });
}

