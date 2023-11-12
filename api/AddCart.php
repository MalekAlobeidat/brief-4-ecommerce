<?php

////////////////////////////////////////////////////////////////////////////////////
///////////////////////       use POST method       ///////////////////////////////////////////
////////////////////// send: id + product_id        //////////////////////////////////////////
// {
//     "product_id":3,
//     "id":3
// }
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// will get a jsin file like the nect one ///////
// {
//     "product_img": "path/to/productimage3.jpg",
//     "product_name": "Science Fiction Book",
//     "product_price": "19.99",
//     "price_after_discount": "0.00",
//     "quantity": 10
// }
/////////////////////////////////////////////////////////////////////////////////////////




header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "brief4");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['product_id'])) {
        $productId = $data['product_id'];
        $quantity = 1;
        $userId = $data['id'];

        // Check if the product is already in the cart for the user
        $cartQuery = "SELECT * FROM cart WHERE user_id = $userId AND product_id = $productId";
        $cartResult = mysqli_query($conn, $cartQuery);

        if ($cartResult && mysqli_num_rows($cartResult) > 0) {
            // Product is already in the cart, update the quantity
            $row = mysqli_fetch_assoc($cartResult);
            $newQuantity = $row['quantity'] + $quantity;

            $updateQuery = "UPDATE cart SET quantity = $newQuantity WHERE user_id = $userId AND product_id = $productId";
            $updateResult = mysqli_query($conn, $updateQuery);

            if ($updateResult) {
                // Fetch the updated product details
                $productQuery = "SELECT name, image, price, price_after_discount FROM products WHERE product_id = '$productId'";
                $productResult = mysqli_query($conn, $productQuery);

                if ($productResult && mysqli_num_rows($productResult) > 0) {
                    $product = mysqli_fetch_assoc($productResult);

                    $response = array(
                        
                            'product_img' => $product['image'],
                            'product_name' => $product['name'],
                            'product_price' => $product['price'],
                            'price_after_discount' => $product['price_after_discount'],
                            'quantity' => $newQuantity
                        
                    );

                    echo json_encode($response);
                } else {
                    $response = array(
                        'error' => 'Error fetching updated product details'
                    );
                    echo json_encode($response);
                }
            } else {
                $response = array(
                    'error' => 'Error updating quantity in the cart'
                );
                echo json_encode($response);
            }
        } else {
            // Product is not in the cart, add it
            $productQuery = "SELECT name, price, image, price_after_discount FROM products WHERE product_id = '$productId'";
            $productResult = mysqli_query($conn, $productQuery);

            if ($productResult && mysqli_num_rows($productResult) > 0) {
                $product = mysqli_fetch_assoc($productResult);

                $insertQuery = "INSERT INTO cart (user_id, product_id, quantity) VALUES ($userId, $productId, $quantity)";
                $insertResult = mysqli_query($conn, $insertQuery);

                if ($insertResult) {
                    $productData = array(
                        'product_img' => $product['image'],
                        'product_name' => $product['name'],
                        'product_price' => $product['price'],
                        'price_after_discount' => $product['price_after_discount'],
                        'quantity' => $quantity
                    );

                    echo json_encode($productData);
                } else {
                    $response = array(
                        'error' => 'Error in adding the product to the cart'
                    );
                    echo json_encode($response);
                }
            } else {
                $response = array(
                    'error' => 'Product not found'
                );
                echo json_encode($response);
            }
        }
    } else {
        $response = array(
            'error' => 'Product ID not provided'
        );
        echo json_encode($response);
    }
} else {
    $response = array(
        'error' => 'Invalid request method'
    );
    echo json_encode($response);
}
?>
