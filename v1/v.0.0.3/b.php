<?php

$conn = mysqli_connect("localhost", "root", "", "12b19a");
$oszt = $_POST["osztaly"];

$select_all = mysqli_query($conn,"select * from eret where osztaly = \"$oszt\" and atlag >= 8");

echo " ";

echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Nev</th>
                <th>Osztaly</th>
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
				echo $sor["atlag"] . "</td>
              </tr>";
}

    echo "</table>";
?>