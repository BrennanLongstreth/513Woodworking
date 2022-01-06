<?php    
    include_once 'config.php';  
    $conn=mysqli_connect($host,$adminuser,$adminpass,$dbname);
    if(mysqli_connect_errno()) {
        die("Connection Failed!".mysqli_connect_error());
    } 

    $status = 6;
    $stmt= mysqli_prepare($conn, 'SELECT SUM(order_price) AS r FROM Orders WHERE order_status = ?;');
    mysqli_stmt_bind_param($stmt,'i',$status);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt,$col1);
    
    if(mysqli_stmt_fetch($stmt)) {
        echo $col1;
    }
    
?>