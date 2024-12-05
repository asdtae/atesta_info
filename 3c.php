<?php
$conn=mysqli_connect("localhost","root","","12b19a");

$id = $_POST["id"];
$name = $_POST["nev"];
$oszt = $_POST["osztaly"];
$mat = $_POST["matematika"];
$inf = $_POST["informatika"];
$rom = $_POST["roman"];
$magy = $_POST["magyar"];
$avg = $_POST["atlag"];

$parancs1="INSERT INTO `erettsegi`(`anyakonyv_sz`, `nev`, `osztaly`, `matematika`, `informatika`, `roman`, `magyar`, `atlag`) VALUES ('$id','$name','$oszt','$mat','$inf','$rom','$magy','$avg')";

$parancs="select * from erettsegi order by atlag desc";

mysqli_query($conn,$parancs1);

$eredmeny=mysqli_query($conn,$parancs);
echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Nev</th>
                <th>Osztaly</th>
                <th>Matek</th>
                <th>Info</th>
                <th>Roman</th>
                <th>Magyar</th>
				<th>Atlag</th>
            </tr>";
    
    while ($sor=mysqli_fetch_assoc($eredmeny)) {
        echo "<tr>
                <td>";
				echo $sor["anyakonyv_sz"] . "</td>
                <td>";
				echo($sor["nev"]) . "</td>
                <td>";
				echo $sor["osztaly"] . "</td>
                <td>";
				echo $sor["matematika"] . "</td>
                <td>";
				echo $sor["informatika"] . "</td>
                <td>";
				echo $sor["roman"] . "</td>
                <td>";
				echo $sor["magyar"] . "</td>
				<td>";
				echo $sor["atlag"] . "</td>
              </tr>";
    }
   
    echo "</table>";

mysqli_close($conn);
?>