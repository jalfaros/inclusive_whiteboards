<?php

require_once __DIR__ . '/sql_pool.php';


function responseReturner( $code, $msg ){
    return array(
        "response" => $code,
        "msg" => $msg
    );
}

try {

    if (!isset($_GET['stickyId']) || !isset($_GET['statusId']) ){
        echo json_encode( responseReturner( 0, "Parametros vacíos" ) );
        exit;
    }

    $db_pool = poolManager();

    if(!$db_pool){
        echo json_encode( responseReturner( 0, "Error en conexión con base de datos" ) );
        exit;
    }

    $query = "UPDATE stickyNotes set statusId = " . $_GET['statusId'] . " WHERE stickyId = " . $_GET['stickyId'];
    $sql_response = sqlsrv_query($db_pool, $query);

    if(!$sql_response){
        echo json_encode( responseReturner( 0, sqlsrv_errors() ) );
        exit;
    }else{
        echo json_encode( responseReturner( 1, "Se ha actualizado la posición correctamente" ) );
        sqlsrv_close($db_pool);
    }


}catch (Exception $e) {
    echo json_encode( responseReturner( 0, e.getMessage() ) );
}


?>