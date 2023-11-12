<?php
//SELECT SUM(total_price) as total FROM `orders`

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';
if($_SERVER["REQUEST_METHOD"] == "GET"){
    try {
        $query="SELECT SUM(total_price) as total FROM `orders`;";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $e) {
        die("Error: " . $e->getMessage());
    }
}







?>