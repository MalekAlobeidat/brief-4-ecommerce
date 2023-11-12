<?php
include 'include.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE,OPTIONS ");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


if ($_SERVER['REQUEST_METHOD'] == "GET") {
            $stmt = $conn->prepare("SELECT `image`, `username`, `review`, `rate` FROM `users` WHERE NOT `review` IS NULL");

            $stmt->execute();

            $result = $stmt->get_result();
            if ($stmt->error) {
                echo json_encode(array("error"=> $stmt->error));
            } else {
                $review = array();
                while ($row = $result->fetch_assoc()) {
                    $review[] = $row;
                }           
                echo json_encode($review);
            }

}else{
    echo json_encode(array("RequestMethod" =>"GET"));
}
?>