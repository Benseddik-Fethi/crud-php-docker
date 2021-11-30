<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../class/user.php';

$database = new Database();
$db = $database->getConnection();

$item = new User($db);
$stmt = $item->getUsers();
$itemCount = $stmt->rowCount();


if ($itemCount > 0) {
    $userArr = array();
    $userArr["body"] = array();
    $userArr["itemCount"] = $itemCount;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $e = array(
            "id" => $id,
            "nom" => $nom,
            "prenom" => $prenom,
            "email" => $email,
        );
        array_push($userArr["body"], $e);
    }
    http_response_code(200);
    echo json_encode($userArr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No users found.")
    );
}