<?php

require_once __DIR__ . '/sql_pool.php';

try{

    if ( !isset($_POST['statusId']) || !isset($_POST['stickyDescription']) ){
        echo ("[{'Error': 'Parámetros vacíos'}]");
        exit; 
    }

    $db_pool = poolManager();

    if (!$db_pool){
        echo ("[{'Error': 'Parámetros vacíos'}]");
        exit;
    }

    $statusId = $_POST['statusId'];
    $stickyDescription = $_POST['stickyDescription'];

    $query = "INSERT INTO stickyNotes( stickyDescription, statusId ) values ('$stickyDescription', '$statusId')";
    $sql_response = sqlsrv_query($db_pool, $query);

    if (!$sql_response){
        echo ("[{Error: Error ejecutando el query}]");
        exit;
    }else {

        $json = array(
            'Response' => true,
            'Message' => "Tarjeta creada correctamente"
        );
        echo json_encode($json);

    }


}catch(Exception $e) {
    echo "Error" . e.getMessage();
}

?>