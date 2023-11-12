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
// {
//     "review": "very cool",
//     "rate": "5",
//     "id": "1"
// }
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!empty($data)) {
        
        //Check if All Required inputs is recieved and not empty
        $requiredFields = ['review','rate','id'];
        $allFieldsPresent = true;
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                $allFieldsPresent = false;
                die(json_encode(array('error'=> $field." :IS EMPTY OR DOESN'T EXIST")));
            }
        }
        if ($allFieldsPresent) {
            $stmt = $conn->prepare("UPDATE `users` SET `review`=?,`rate`=? WHERE id = ?");

            $stmt->bind_param("sii", $data["review"], $data["rate"], $data["id"]);

            $stmt->execute();

            $result = $stmt->get_result();
            if ($stmt->error) {
                echo json_encode(array("error"=> $stmt->error));
            } else {
                echo json_encode(array("result"=> "Review inserted successfully!"));
            }
        }
    }else{
        echo json_encode(array("error"=> "invalid json fromat"));
    }
}else{
    echo json_encode(array("RequestMethod" =>"POST"));
}
?>