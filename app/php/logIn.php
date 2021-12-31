<?php 
session_start();
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: Content-Type");
//Authorization
include __DIR__ . '/sql_pool.php';

try {
    //code...
    $userName = $_POST['userName'];
    //$password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $password = $_POST["password"];

    if (!$userName || !$password){
        echo("[false, {'Error': 'You must send the params userName and password}]");
        exit();
    }
    $conn = poolManager();
    $result = sqlsrv_query($conn, "EXEC sp_auth_user '$userName'");
    
    $obj = sqlsrv_fetch_object($result);

    if ($obj && password_verify($password, ($obj->pass)  ))
    {
        $_SESSION["id"]=$obj->id;
        $_SESSION["userName"]=$obj->userName;
        echo "[true, {'id':'$obj->id', 'userName':'$obj->userName'}]";
    }
    else
    {
        echo ("[false,{'error':'UserName or password invalid'}]");
    }
} catch (Exception $e) {
    //throw $th;
    echo "Error: " . $e->getMessage();
}
sqlsrv_close($conn);

?>