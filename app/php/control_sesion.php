
<?php
session_start();

/*********Eliminar estando producción************/
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set("display_errors", 1);
/*************************************************/

if (!isset($_SESSION["id"]))
{
    echo "[false, {'user':'logout'}]";
}else{
    echo "[true, {'user':'logIn'}]";
}
?>

