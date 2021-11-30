<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../class/user.php';

$database = new Database();
$db = $database->getConnection();

$id = $_POST["id"];
$item = new User($db);

$item->id = $id;
$item->nom = $_POST["nom"];
$item->prenom = $_POST["prenom"];
$item->email =$_POST["email"];


if($item->updateUser()){
    echo json_encode("Utilisateur data updated.");
} else{
    echo json_encode("Data could not be updated");
}

