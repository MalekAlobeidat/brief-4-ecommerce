<?php
//////////////////////////////////////////////////////////////////////
///////////////////use GET Method  ///////////////////////////////////////// 
/////////////////to get all the users /////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////send :id + POST method ////////////////////////////
/////////////////to GET the user /////////////////////////////////
//////////////////////////////////////////////////////////////////////
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
$conn = mysqli_connect("localhost", "root", "", "brief4");



if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) { 
        $events = array();
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
        echo json_encode($events);
    } else {
        echo json_encode(array("message" => "No user records found."));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $Id = $data['id'];
        $sql = "SELECT * FROM users WHERE id = $Id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {  
            $event = $result->fetch_assoc();
            echo json_encode($event);
        } else {
            echo json_encode(array("message" => "user with the provided ID not found."));
        }
    } else {
        echo json_encode(array("error" => "Please provide the user ID."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}

$conn->close();
?>
