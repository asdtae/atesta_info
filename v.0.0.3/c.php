<?php

$conn = mysqli_connect("localhost", "root", "", "12b19a");
$select_all = mysqli_query($conn,"select * from eret order by anyakonyv_sz desc");

$ID = $_POST["id"];
$Nev = $_POST["nev"];
$Osztaly = $_POST["osztaly"];
$Matek = $_POST["matematika"];
$Info = $_POST["informatika"];
$Roman = $_POST["roman"];
$Magyar = $_POST["magyar"];

mysqli_query($conn," INSERT INTO `eret`(`anyakonyv_sz`,
			 `nev`,
			 `osztaly`,
			 `matematika`,
			 `informatika`,
			 `roman`,
			 `magyar`)
			 VALUES ($ID, '$Nev' , '$Osztaly' ,$Matek, $Info, $Roman, $Magyar);");
			 
mysqli_query($conn,"UPDATE eret SET `atlag` = (`matematika` + `informatika` + `roman` + `magyar`) / 4");

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

while($sor=mysqli_fetch_assoc($select_all))
{
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
?>