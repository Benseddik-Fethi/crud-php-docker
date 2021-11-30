<?php

class User
{
    private $conn;
    private $db_table = "user";
    public $id;
    public $nom;
    public $prenom;
    public $email;

    public function __construct($db){
        $this->conn = $db;
    }

    public function getUsers(){
        $query = "SELECT * FROM " . $this->db_table . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function createUser(){
        $query = "INSERT INTO " . $this->db_table ."
         SET nom = :nom, prenom = :prenom, email = :email";
        $stmt = $this->conn->prepare($query);
        $this->nom=htmlspecialchars(strip_tags($this->nom));
        $this->prenom=htmlspecialchars(strip_tags($this->prenom));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(":nom", $this->nom);
        $stmt->bindParam(":prenom", $this->prenom);
        $stmt->bindParam(":email", $this->email);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function updateUser(){
        $query = "UPDATE
                    " . $this->db_table . "
                SET
                    nom = :nom, prenom = :prenom, email = :email
                WHERE
                    id = :id";
        $stmt = $this->conn->prepare($query);
        $this->nom=htmlspecialchars(strip_tags($this->nom));
        $this->prenom=htmlspecialchars(strip_tags($this->prenom));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(":nom", $this->nom);
        $stmt->bindParam(":prenom", $this->prenom);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id", $this->id);
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function deleteUser(){
        $query = "DELETE FROM " . $this->db_table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
        if($stmt->execute()){
            return true;
        }

        return false;
    }
    public function getUserById(){
        $query = "SELECT * FROM " . $this->db_table . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $this->id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->nom = $row['nom'];
        $this->prenom = $row['prenom'];
        $this->email = $row['email'];
    }
}

