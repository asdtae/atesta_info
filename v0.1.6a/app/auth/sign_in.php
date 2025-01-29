<?php
session_start();
$db = mysqli_connect('localhost','root','','12b19a');
$select = mysqli_query($db,"SELECT * FROM `index`");

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true)
{
    header("location: ../home.php");
    exit;
}

if(isset($_POST["username"]))
{
    header("location: ../home.php");
    $_SESSION["test"] = "username: ".$_POST["username"];
    exit;
}

?>
<html lang="en">
<head>
    <title>Cycle Sphere</title>
    <meta charset="utf-8">
    <link rel="icon" href="../../assets/images/favicon.ico" type="image/ico">
    <link rel="stylesheet" type="text/css" href="../navigation.css">
    <link rel="stylesheet" type="text/css" href="./auth.css">
</head>
<body>
<nav class="navbar quicksand-title">
    <div class="navbar-left">
        <a href="../../index.php" class="website-name">
            Cyclesphere
        </a>
    </div>
    <div class="navbar-right">
        <a href="../home.php" class="navbar-link">
            App
        </a>
        <a href="../../docs/index.php" class="navbar-link">
            Docs
        </a>
        <div class="bullet"></div>
        <a href="./sign_in.php" class="navbar-link">
            Sign In
        </a>
    </div>
</nav>

<div class="main">
    <form action="sign_in.php" method="POST">
		<input type="text" name="username">
		<input type="password" name="password">
		<input type="submit">
	</form>
</div>

<footer class="footer">
    <div class="footer-left">
        <p class="footer-left-copyright">© 2025 asdtae,<br><strong>Some rights reserved</strong>.</p>
    </div>
    <div class="footer-right">
        <a href="../home.php" class="footer-link">
            App
        </a>
        <a href="../../docs/index.php" class="footer-link">
            Docs
        </a>
        <a href="./sign_in.php" class="footer-link">
            Sign In
        </a>
    </div>
</footer>
</body>
</html>
<?php
mysqli_close($db);
?>
