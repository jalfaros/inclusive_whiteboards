<?php
session_start();
unset($_SESSION["userName"]);
unset($_SESSION["id"]);

echo "['true', {'user':'logOut'}]";
?>

