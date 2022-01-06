<?php
//set up database connection
    include_once 'config.php';
    $conn=mysqli_connect($host,$adminuser,$adminpass,$dbname);
    if(mysqli_connect_errno()) {
        die("Connection Failed!".mysqli_connect_error());
    } 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proof Of Purchase</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1>Proof Of Purchase</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h2>Thank you for your purchase!</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p>
                    <strong>Order Number:</strong> <?php echo $order_number; ?>
                </p>
                <p>
                    <strong>Order Date:</strong> <?php echo $order_date; ?>
                </p>
                <p>
                    <strong>Order Total:</strong> <?php echo $order_total; ?>
                </p>
                <p>
                    <strong>Order Status:</strong> <?php echo $order_status; ?>
                </p>
                <p>
                    <strong>Order Details:</strong>
                </p>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($order_details as $order_detail) { ?>
                            <tr>
                                <td><?php echo $order_detail['product_name']; ?></td>
                                <td><?php echo $order_detail['quantity']; ?></td>
                                <td><?php echo $order_detail['price']; ?></td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>

<?php
    mysqli_close($conn);
?>