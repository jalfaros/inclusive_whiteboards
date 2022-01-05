
<?php 
session_start();
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: Content-Type");
//Authorization
include __DIR__ . '/sql_pool.php';

try {
    //code...
    $stickyId          = $_POST['stickyId'];
    $color  = $_POST["color"];

    if (!$stickyId || !$color){
        echo("[false, {'Error': 'You must send the params stickyId and color}]");
        exit();
    }
    $conn = poolManager();
    $sql_response = sqlsrv_query($conn, "EXEC sp_edit_color_stickynote '$stickyId', '$color'");
    
    
    if (!$sql_response) {
        echo ("[{success: 0}]");
        die( print_r( sqlsrv_errors(), true));

    }else {  
        $json = array();
        array_push($json, true, "{'id':'$stickyId', 'msg':'sticky description Edited'}");
        echo json_encode($json);
    }
} catch (Exception $e) {
    //throw $th;
    echo "Error: " . $e->getMessage();
}
sqlsrv_close($conn);

?>