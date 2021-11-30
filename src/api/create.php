<?php
include_once '../config/header.php';
include_once '../config/database.php';
include_once '../class/user.php';

$database = new Database();
$db = $database->getConnection();

$item = new User($db);

$item->nom = $_POST["nom"];
$item->prenom = $_POST["prenom"];
$item->email =$_POST["email"];


if($item->createUser()){
    echo 'Employee created successfully.';
} else{
    echo 'Employee could not be created.';
}
