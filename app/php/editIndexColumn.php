<?php

require_once __DIR__ . '/sql_pool.php';

try {

    if (!isset( $_GET["statusId"]) || !isset( $_GET["statusIndex"])){
        echo json_encode("['Error': 'Falta el parametro del usuario']");
        exit;
    }

    $statusId = $_GET["statusId"];
    $statusIndex = $_GET["statusIndex"];
    $db_pool = poolManager();

    if( !$db_pool ){
        echo json_encode("['Error': 'Error en conexión con base de datos']");
        exit;
    }

    $query = "update workflowStatus set statusIndex = '$statusIndex'
	 where statusId =  '$statusId'";
    $sql_response = sqlsrv_query($db_pool, $query);

    if ( !$sql_response ){
        echo json_encode("['Error': 'Error ejecutando el query']");
        exit;
    }else { 
        $json = array();
        array_push($json, true, "{'id':'$statusId', 'msg':'Status index Edited'}");
        echo json_encode($json);
    }


}catch( Exception $e ){
    echo "Error en el catch";   
}


?>