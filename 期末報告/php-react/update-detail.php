<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->seq)
    
) {
   
	$qty =($data->qty);
	$discount =($data->discount);
    $updateDetail = mysqli_query($db_connection, "UPDATE `orderdetail` SET `Qty`=$qty,`Discount`=$discount WHERE `seq`='$data->seq'");
    if ($updateDetail) {
        echo json_encode(["success" => 1, "msg" => "Detail Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Detail Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>