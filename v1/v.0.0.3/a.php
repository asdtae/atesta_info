<?php

$conn = mysqli_connect("localhost", "root", "", "12b19a");
$select_all = mysqli_query($conn,"select * from eret order by osztaly, nev");

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