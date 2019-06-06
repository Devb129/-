<?php
header('Content-type:text/json');
$servername = "localhost";
$username = "root";
$password = "mypassword";
$dbname = "bill";
 
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
$open=mysqli_select_db($conn,"bill");
$id =$_GET["id"];
$orderdate =$_GET["orderdate"];
$bill =$_GET["bill"];
$meal =$_GET["meal"];

// Check connection
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}

$sql="select orderdate,bill from bill";
$result = mysqli_query($conn, $sql);
 
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        echo json_encode("orderdate: " . $row["orderdate"]. " bill:" . $row["bill"]. "<br>");
    }
} else {
    echo "0 结果";
}
 
mysqli_close($conn);
?>