<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
$conn = mysqli_connect("localhost", "root", "", "brief4");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $Id = $data['id'];
        $sql = "SELECT products.image, products.name,products.product_id, products.price, products.price_after_discount, cart.quantity FROM cart JOIN products ON products.product_id = cart.product_id JOIN users ON users.id = cart.user_id WHERE users.id = $Id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {  
            $events = array(); // Initialize an array to store all orders

            while ($row = $result->fetch_assoc()) {
                // Add each order to the array
                $events[] = $row;
            }

            echo json_encode($events);
        } else {
            echo json_encode(array("message" => "No orders found for the provided user ID."));
        }
    } else {
        echo json_encode(array("error" => "Please provide the user ID."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}

$conn->close();
?>
