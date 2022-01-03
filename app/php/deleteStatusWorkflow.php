<?php
require_once __DIR__ . '/sql_pool.php';

try {

    if( !isset( $_GET['statusId'])){
        echo json_encode(array(
            false,
            'Error' => 'Falta el parámetro statusId'
        ));
        exit;
    }

    $statusId = $_GET['statusId'];

    $db_pool = poolManager();

    if( !$db_pool){
        echo json_encode(array(
            false,
            'Error' => 'Error al conectarse a la base de datos'
        ));
        exit;
    }

    $query = "DELETE FROM workflowStatus WHERE statusId = " . $statusId;
    $sql_response = sqlsrv_query($db_pool, $query);

    if ( !$sql_response ){
        echo json_encode(array(
            false,
            'Error' => 'Error ejecutando el query'
        ));
        exit;
    }else{
        echo json_encode(array(
            true,
            'Exito' => 'Se ha eliminado correctamente'
        ));
    }


}catch(Exception $e){
    echo "Error en el catch";
}
?>