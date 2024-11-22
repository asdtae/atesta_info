<?php

    $conn = mysqli_connect("localhost","root","","12b19a");
    $parancs="select evfoly,osztaly,nev,jegy from test where jegy > 8 ";

    $eredmeny = mysqli_query($conn, $parancs);

    echo "<table border='1'>
            <tr>
                <th>Nev</th>
            </tr>";

    while ($sor=mysqli_fetch_assoc($eredmeny))
    {
        echo "<tr>
                    <td>" . $sor["nev"] . "</td>
                </tr>";
    }
    mysqli_close($conn);

