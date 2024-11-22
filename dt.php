<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>idklol</title>
  <style>
	
  </style>
</head>

<body>
  <h1>Feladatok</h1>
  <h3>Feladat0:</h3>
  <?php

	$conn = mysqli_connect("localhost","root","","12b");

	$parancs="select orszag, fovaros from orszagok";
	$eredmeny = mysqli_query($conn, $parancs);
	while ($sor=mysqli_fetch_assoc($eredmeny))
	{
		echo $sor["orszag"]." ".$sor["fovaros"]."<br>";
	
	}
	mysqli_close($conn);

	?>
</body>

</html>