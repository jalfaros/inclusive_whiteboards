
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            const resp=eval ("("+xhr.responseText+")");
            //console.log(xhr.responseText, 'init');
            if(resp[0]){
                window.location.replace('http://localhost/inclusive_whiteboards/app/html/home.html');
            }
        }
    }
    xhr.open('GET', 'http://localhost/inclusive_whiteboards/app/php/control_sesion.php', true);
    xhr.send(null);

const logIn = (e) =>{
    e.preventDefault();
    const userName = document.getElementById('id_username').value;
    const password = document.getElementById('id_password').value;
    const xhttp    = new XMLHttpRequest();
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                const resp=eval ("("+xhttp.responseText+")");
                
                resp[0]==false? (
                    console.log(resp[1].error),
                    alert(resp[1].error)
                ) : (   
                    console.log(resp[1], 'datos del usuario para el que los ocupe'),
                    window.location.replace('http://localhost/inclusive_whiteboards/app/html/home.html')
                )
            }
        };
        xhttp.open("POST", "http://localhost/inclusive_whiteboards/app/php/logIn.php", true);
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("password", password);
        xhttp.send(formData);  


}
