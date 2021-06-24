<?php
// all-users.php is to fetch all users that exist in the database.
// Method: GET - http://localhost/php-react/all-users.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$allcust = mysqli_query($db_connection, "SELECT
    `CustName` AS custname,
    `CustId` AS custid,
    `City` AS city,
    `Address` AS address,
    `ZipCode` AS zipcode,
    `Contact` AS contact,
    `JobTitle` AS jobtitle,
    `Phone` AS phone,
    `Industry` AS industry,
    `TaxNo` AS taxno
FROM
    `customer`
WHERE
    1");
if (mysqli_num_rows($allcust) > 0) {
    $all_Cust = mysqli_fetch_all($allcust, MYSQLI_ASSOC);
    // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
    echo json_encode(["success" => 1, "allcust" => $all_Cust], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => 0]);
}
?>
