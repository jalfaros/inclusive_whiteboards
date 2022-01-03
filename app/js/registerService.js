const BASEURL = 'http://localhost/inclusive_whiteboards/app/'

const registerEventForm = (e) => {
    e.preventDefault();
    onRegisterFetch( new FormData( e.target ) );

}


const onRegisterFetch = (formData) => {

    fetch(BASEURL + 'php/register.php', {
        method: 'POST',
        body: formData

    }).then(response => response['status'] === 200 && response.json())
        .then(myData => {
            if (myData.length === 0) {
                alert('User created!')
                location.replace(`${BASEURL}html/loginForm.html`);
            } else {
                document.getElementById("already_user").style.display = "inline-block";
            }
        })
        .catch(err => alert("Error en la base de datos."))
}