<?php
include_once '../config/header.php';

include_once '../config/database.php';
include_once '../class/user.php';

$database = new Database();
$db = $database->getConnection();
$id = $_POST["id"];
$item = new User($db);

$item->id = $id;

if($item->deleteUser()){
    echo json_encode("Employee deleted.");
} else{
    echo json_encode("Data could not be deleted");
}
