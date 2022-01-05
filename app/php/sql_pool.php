<?php
    // Setear en variables de entorno más adelante
    //Con esto se va manejar el registro de los usuarios
    $servername = ".\SQLEXPRESS";
    $connection_info = array( "Database" => "inclusive_whiteboards", "UID" => "Whiteboard", "PWD" => "admin");

    function poolManager(){
        try{

            global $servername;
            global $connection_info;

            $pool = sqlsrv_connect($servername, $connection_info);
            
            if( !$pool ){
                return null;
            }
            return $pool;
        }catch( Exception $e ){
            echo "Error: " . $e->getMessage;
        }
    }


?>
    