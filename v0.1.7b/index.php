<?php
	$db = mysqli_connect('localhost','root','','12b19a');
	$select = mysqli_query($db,"SELECT * FROM `index`");
?>
<html lang="en">
<head>
    <title>Cycle Sphere</title>
	<meta charset="utf-8">
	<link rel="icon" href="./assets/images/favicon.ico" type="image/ico">
    <link rel="stylesheet" type="text/css" href="splash.css">
</head>
<body>
    <div class="main">
        <div class="splash-bg">
            <nav class="navbar quicksand-title">
                <div class="navbar-left">
                    <a href="./index.php" class="website-name">
                        Cyclesphere
                    </a>
                </div>
                <div class="navbar-right">
                    <a href="./app/home.php" class="navbar-link">
                        App
                    </a>
                    <a href="./docs/index.php" class="navbar-link">
                        Docs
                    </a>
                    <div class="bullet"></div>
                    <a href="./app/auth/sign_in.php" class="navbar-link">
                        Sign In
                    </a>
                </div>
            </nav>
            <div class="wrap-t">
                <div class="title quicksand-title">
                    <?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 1) echo $txt["text"]; break;}?>
                </div>
                <div class="motto varela-round-regular">
                    <?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 2) echo $txt["text"]; break;}?>
                </div>
            </div>
        </div>
		<div class="wrap">
			<div class="bio varela-round-regular">
				<?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 3) echo $txt["text"]; break;}?>
			</div>
            <div class="points">
                <div class="poi_row">
                    <img src="assets/images/poi1.jpg" class="poi_img">
                    <p class="poi_text quicksand-title"><?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 4) echo $txt["text"]; break;}?></p>
                </div>
                <div class="poi_row">
                    <p class="poi_text quicksand-title"><?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 5) echo $txt["text"]; break;}?></p>
                    <img src="assets/images/poi2.jpg" class="poi_img">
                </div>
                <div class="poi_row">
                    <img src="assets/images/poi3.jpg" class="poi_img">
                    <p class="poi_text quicksand-title"><?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 6) echo $txt["text"]; break;}?></p>
                </div>
                <div class="poi_row">
                    <p class="poi_text quicksand-title"><?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 7) echo $txt["text"]; break;}?></p>
                    <img src="assets/images/poi4.jpg" class="poi_img">
                </div>
            </div>
			<div class="bio varela-round-regular">
                <p class="quicksand-title">MISSION</p>
				<?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 8) echo $txt["text"]; break;}?>
			</div>
            <div class="mpoints">
                <div class="mpoi_row">
                    <img src="assets/images/poi4.jpg" class="mpoi_img">
                    <p class="mpoi_text quicksand-title"><?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 9) echo $txt["text"]; break;}?></p>
                </div>
                <div class="mpoi_row">
                    <img src="assets/images/poi4.jpg" class="mpoi_img">
                    <p class="mpoi_text quicksand-title"><?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 10) echo $txt["text"]; break;}?></p>
                </div>
                <div class="mpoi_row">
                    <img src="assets/images/poi4.jpg" class="mpoi_img">
                    <p class="mpoi_text quicksand-title"><?php while($txt = mysqli_fetch_assoc($select)){if($txt["id"] == 11) echo $txt["text"]; break;}?></p>
                </div>
            </div>
		</div>
	</div>
	<footer class="footer">
        <div class="footer-left">
            <p class="footer-left-copyright">© 2025 asdtae,<br><strong>Some rights reserved</strong>.</p>
        </div>
        <div class="footer-right">
            <a href="./app/home.php" class="footer-link">
                App
            </a>
            <a href="./docs/index.php" class="footer-link">
                Docs
            </a>
            <a href="app/auth/sign_in.php" class="footer-link">
                Sing In
            </a>
        </div>
	</footer>
</body>
</html>
<?php
	mysqli_close($db);
?>