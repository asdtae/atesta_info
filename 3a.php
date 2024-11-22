<?php

	$conn = mysqli_connect("localhost","root","","12b19a");
	$parancs="select osztaly, nev from erettsegi order by osztaly,nev";
	
	$eredmeny = mysqli_query($conn, $parancs);
	
	echo "<table border='1'>
            <tr>
                <th>Osztaly</th>
                <th>Nev</th>
            </tr>";
	
	while ($sor=mysqli_fetch_assoc($eredmeny))
	{
		echo "<tr>
                <td>";
				echo $sor["osztaly"] . "</td>
                <td>";
				echo $sor["nev"] . "</td>
              </tr>";
	}
	mysqli_close($conn);

?>