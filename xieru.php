<?php
$servername = "localhost";
$username = "root";
$password = "mypassword";
$dbname = "bill";

$id =$_GET['id'];
$orderdate =$_GET['orderdate'];
$bill =$_GET['bill'];
$meal =$_GET['meal'];
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
 
$sql = "INSERT INTO bill
VALUES ('$id','$orderdate','$bill','$meal')";
 
if (mysqli_query($conn, $sql)) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
 
mysqli_close($conn);
?>

