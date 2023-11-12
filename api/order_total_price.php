<?php
$conn = mysqli_connect("localhost", "root", "", "brief4");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$response = array();

if ($conn) {
    $sql = "SELECT SUM(total_price) AS total FROM orders";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        header("Content-Type: application/json");

        $row = mysqli_fetch_assoc($result); // Added a semicolon here

        $response['total'] = $row['total'];
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
} else {
    echo "Database connection failed";
}
?>

