<?php


require_once __DIR__ . '/sql_pool.php';

try{

    if ( !isset($_POST['flowName']) || !isset($_POST['flowDescription'])){
        echo ("[{'Error': 'Parámetros vacíos'}]");
    }

    $flowName = $_POST['flowName'];
    $flowDescription = $_POST['flowDescription'];
    $flowOwner = 68; //Cambiar


    $db_pool = poolManager();

    if( !$db_pool ){
        echo ("[{'Error': 'Conexión a base de datos incorrecta'}]");
        exit;
    }

    $query = "EXEC sp_add_workflow '$flowName', '$flowDescription','$flowOwner'";
    $sql_response = sqlsrv_query($db_pool, $query);

    
    if (!$sql_response) {
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
    echo "Error en el catch";
}


?>