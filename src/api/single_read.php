<?php
include_once '../config/header.php';
include_once '../config/database.php';
include_once '../class/user.php';

$database = new Database();
$db = $database->getConnection();
$item = new User($db);
$item->id = isset($_GET['id']) ? $_GET['id'] : die();

$item->getUserById();

if($item->nom!=null){
    // create array
    $user_arr = array(
        "id" =>  $item->id,
        "nom" => $item->nom,
        "prenom" => $item->prenom,
        "email" => $item->email
    );
    http_response_code(200);
    echo json_encode($user_arr);
}
else{
    http_response_code(404);
    echo json_encode(array("message" => "User does not exist."));
}