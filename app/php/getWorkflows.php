<?php
session_start();
require_once __DIR__ . '/sql_pool.php';

try {

    $ownerId = $_SESSION["id"];
    $db_pool = poolManager();

    if( !$db_pool ){
        echo json_encode("['Error': 'Error en conexión con base de datos']");
        exit;
    }

    $query = "SELECT * FROM workflows where flowOwnerId = " . $ownerId;
    $sql_response = sqlsrv_query($db_pool, $query);

    if ( !$sql_response ){
        echo json_encode("['Error': 'Error $ownerId ejecutando el query']");
        exit;
    }else { 
        $json_response = array();

        while( $row = sqlsrv_fetch_array( $sql_response, SQLSRV_FETCH_ASSOC ) ){
            $json_response[] = $row;
        }

        echo json_encode($json_response);
        sqlsrv_close($db_pool);
    }


}catch( Exception $e ){
    echo "Error en el catch";   
}


?>