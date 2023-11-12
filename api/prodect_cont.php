<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$database = "brief4";

$conn = new mysqli($servername, $username, $password, $database);

$response = array();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT COUNT(*) as count FROM products";
$result = $conn->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    $response['count'] = $row['count'];
    echo json_encode($response, JSON_PRETTY_PRINT);
} else {
    $response['error'] = "Query failed";
    echo json_encode($response, JSON_PRETTY_PRINT);
}

$conn->close();
?>
