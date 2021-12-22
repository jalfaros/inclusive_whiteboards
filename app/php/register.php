
<?php

require __DIR__ . '/sql_pool.php';

function hashPassword( $password ) {
    try{
        return password_hash($password, PASSWORD_DEFAULT);
    }catch( Exception $e){
        echo "Error: " . $e->getMessage();
        return null;
    }
}

try { 

    $username = $_POST['username'];
    $password = hashPassword($_POST['password']);
    $firstName = $_POST['firstName'];
    $secondName = (isset( $_POST['secondName'] )) ? $_POST['secondName'] : null;
    $lastName = $_POST['lastName'];


    $db_pool = poolManager();

    if( !$db_pool ){
        echo "Error en conexión de base de datos";
        return;
    }

    $query = "EXEC register_user '$username', '$password','$firstName','$secondName','$lastName'";
    $sql_response = sqlsrv_query($db_pool, $query);


    if ($sql_response === false) {

        die( print_r( sqlsrv_errors(), true));

    }else {  
        
        $row = sqlsrv_fetch_array( $sql_response, SQLSRV_FETCH_ASSOC);
        sqlsrv_close($db_pool);
        $sucess = $row['success'] ?? 1; 
        echo $sucess;

        //Falta el return y todo eso, ya se valida
    }


}catch( Exception $e ){
    sqlsrv_close($db_pool);
    echo "Error: " . $e->getMessage();
    return false;
}

?>