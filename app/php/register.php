
<?php

require_once __DIR__ . '/sql_pool.php';

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
        echo ("[{success: 0}]");
        die( print_r( sqlsrv.error(), true ) );
    }

    $query = "EXEC register_user '$username', '$password','$firstName','$secondName','$lastName'";
    $sql_response = sqlsrv_query($db_pool, $query);


    if ($sql_response === false) {
        echo ("[{success: 0}]");
        die( print_r( sqlsrv_errors(), true));

    }else {  

        $json = array();
        
        while( $row = sqlsrv_fetch_array( $sql_response, SQLSRV_FETCH_ASSOC) ){
            $json[] = $row;
        }

        echo json_encode($json);
        sqlsrv_close($db_pool); 

    }


}catch( Exception $e ){
    echo ("[{'success': '$e.getMessage()' }]");
    sqlsrv_close($db_pool);
}

?>