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
    isset($data->proid)
    && isset($data->proname)
    && isset($data->price)
	&& isset($data->cost)
    && is_numeric($data->price)
	&& is_numeric($data->cost)
    && !empty(trim($data->proname))
) {
    $proname = mysqli_real_escape_string($db_connection, trim($data->proname));
	$price=($data->price);
	$cost=($data->cost);
    $updateUser = mysqli_query($db_connection, "UPDATE `product` SET `ProdName`='$proname',`UnitPrice`=$price,`Cost`=$cost WHERE `ProdID`='$data->proid'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "User Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>