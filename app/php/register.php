
<?php

require __DIR__ . '/mysqlpool.php';

function hashPassword( $password ) {
    try{
        return password_hash($password, PASSWORD_DEFAULT);
    }catch( Exception $e){
        echo "Error: " . $e->getMessage();
        return null;
    }
}

function registerManager() {
    try { 

        $password = hashPassword($_POST['password']);
        $username = $_POST['username'];

        $db_pool = poolManager();

        if( !$db_pool ){
            echo "Error en conexión de base de datos";
            return;
        }

        $query = "CALL register_user('jalfaros','$password','Jose','','Alfaro Solano')";
        //$query = "INSERT INTO user_login (username, password) VALUES ('$username','$password')";
        
        $response = mysqli_query( $db_pool, $query );
        
        while ($row = mysqli_fetch_array($response)){
            echo $row['success'];
        }


        print_r ($response);

        mysqli_close( $db_pool );

    }catch( Exception $e ){
        echo "Error: " . $e->getMessage();
    }
}

registerManager();


?>