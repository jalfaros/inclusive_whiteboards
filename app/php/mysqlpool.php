<?php
    // Setear en variables de entorno más adelante
    //Con esto se va manejar el registro de los usuarios
    $servername = "localhost";
    $username = "test";
    $password = "QGR2s5qDlEpQXU8d"; 
    $database = "inclusive_whiteboards";



    function poolManager(){
        try{

            global $servername;
            global $username;
            global $password;
            global $database;
    
            $pool = mysqli_connect( $servername, $username, $password, $database);

            if( !$pool ){
                return null;
            }
            return $pool;
        }catch( Exception $e ){
            echo "Error: " . $e->getMessage;
        }
    }


?>