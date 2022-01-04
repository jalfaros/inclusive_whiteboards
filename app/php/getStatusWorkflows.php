<?php

require_once __DIR__ . '/sql_pool.php';

try {

    if (!isset( $_GET["statusId"] )){
        echo json_encode("['Error': 'Falta el parametro del usuario']");
        exit;
    }

    $statusId = $_GET["statusId"];
    $db_pool = poolManager();

    if( !$db_pool ){
        echo json_encode("['Error': 'Error en conexión con base de datos']");
        exit;
    }

    $query = "SELECT * from workflowStatus as WS full outer join stickyNotes AS cards on WS.statusId = cards.statusId where ws.flowId =" . $statusId . "for json auto";

    $sql_response = sqlsrv_query($db_pool, $query);

    if ( !$sql_response ){
        echo json_encode("['Error': 'Error ejecutando el query']");
        exit;
    }else {
        
        $row = sqlsrv_fetch_array( $sql_response, SQLSRV_FETCH_ASSOC );
        print_r( array_values( $row)[0], false );

        // while( $row = sqlsrv_fetch_array( $sql_response, SQLSRV_FETCH_ASSOC ) ){

            
        //     $query = "SELECT * from workflowStatus as WS full outer join stickyNotes AS cards on WS.statusId = cards.statusId where ws.flowId =" . $row['statusId'] . "for json auto";
        //     $response = sqlsrv_query($db_pool, $query);
            
        //     while( $column = sqlsrv_fetch_array( $response, SQLSRV_FETCH_ASSOC ) ){
        //         print_r( $column, false );
        //     }
        // }
        #print_r ($json_response, false);


        //echo json_encode($json_response);
        sqlsrv_close($db_pool);
    }


}catch( Exception $e ){
    echo "Error en el catch";   
}


?>