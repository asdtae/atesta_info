<?php

$db = mysqli_connect('localhost','root','','12b19a');

$id = $_POST["ID"];
$serz = $_POST["SERZ"];
$cim = $_POST["CIM"];
$olvnv = $_POST["OLVNV"];
$date = $_POST["DATE"];

$update = mysqli_query($db,"UPDATE `konyvtar` SET `szerzo`='$serz',`cim`='$cim',`olvaso_neve`='$olvnv',`datum_kivette`='$date' WHERE `leltar_szam` = \"$id\" ");
$select = mysqli_query($db,"SELECT * FROM `konyvtar`");

echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Szerzo</th>
                <th>Cim</th>
                <th>Olvaso Neve</th>
                <th>Datum</th>
            </tr>";

while($sor = mysqli_fetch_assoc($select))
{
	echo "<tr>
				<td>";
				echo $sor["leltar_szam"] . "</td>
                <td>";
				echo $sor["szerzo"] . "</td>
                <td>";
				echo($sor["cim"]) . "</td>
                <td>";
				echo $sor["olvaso_neve"] . "</td>
                <td>";
				echo $sor["datum_kivette"] . "</td>
                
              </tr>";
}

	echo "</table>";	

?>