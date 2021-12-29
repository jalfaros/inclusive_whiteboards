

const BASEURL = 'http://localhost/inclusive_whiteboards/app/php/'

const registerEventForm = () => {

    var form = document.getElementById('registrationForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        formData = new FormData( e.target );        
        onRegister( formData );
    });

}


const onRegister = ( formData ) => {

  
    fetch( BASEURL + 'register.php', { 
        method: 'POST',
        body: formData
    
    }).then( response => response['status'] === 200 && response.json())
    .then( myData => {
        if ( myData.length === 0 ){
            alert('Se ha registrado correctamente!')
        }else{
            alert('Nombre de usuario en uso!')
        }
    })
    .catch( err => console.log(err) )
}