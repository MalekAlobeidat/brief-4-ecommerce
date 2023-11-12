<?php

/////////////////////////////////////////////////////////////////////////////////////
///////////////// use DELETE method ////////////////////////////////////////////////
//////////////// send: category_id  ///////////////////////////////////////////////
// {
//     "id":"2",
// }
//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'include.php';



if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
 $data = json_decode(file_get_contents('php://input'), true);
 $id=$data['id'];
//  echo $id;
    if (!empty($data)) {

        $sql = "DELETE FROM `products` WHERE product_id =$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("message" => " record deleted successfully."));
        } else {
            echo json_encode(array("error" => "Error: " . $conn->error));
        }
    } else {
        echo json_encode(array("message" => "No data provided for deletion."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Please use delete method."));
}
// $conn->close();
?>

