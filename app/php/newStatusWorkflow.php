<?php


require_once __DIR__ . '/sql_pool.php';

try{

    $statusIndex = $_POST['statusIndex'];
    $statusName = $_POST['statusName'];
    $flowId = $_POST['flowId']; //Cambiar

    if ( !$statusIndex || !$statusName || !$flowId){
        echo ("[{'Error': 'Parámetros vacíos'}]");
    }

    $db_pool = poolManager();

    if( !$db_pool ){
        echo ("[{'Error': 'Conexión a base de datos incorrecta'}]");
        exit;
    }

    $query = "EXEC sp_new_status_workflow '$statusIndex', '$statusName','$flowId'";
    $sql_response = sqlsrv_query($db_pool, $query);

    
    if (!$sql_response) {
        echo ("[{success: 0}]");
        die( print_r( sqlsrv_errors(), true));

    }else {  
        $json = array();
        array_push($json, true, "{'msg':'Status $statusName created'}");
        echo json_encode($json);

    }
    

}catch( Exception $e ){
    echo "Error en el catch";
}


?>