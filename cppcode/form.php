<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Da cpp</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../splash.css">
</head>
<body>
<form action="gen.php" method="post" class="form">
<table>
<?php
    $n = $_POST["colnumb"];

    echo "<tr><th>Tabla neve:</th><th><input type=\"text\" name=\"table_name\"></th></tr>".
         "<tr><th>loop start:</th><th><input type=\"text\" name=\"loops\"></th></tr>".
         "<tr><th>loop end:</th><th><input type=\"text\" name=\"loope\"></th></tr>".
         "<tr><th>Oszlopok tipusa:</th>";

    for($i = 1; $i <= $n; $i++)
    {
        #$it = $i / 2 + 0.5;
        echo "<th><input name=\"gen_key".$i."\" list=\"key\">".
             "<datalist id=\"key\">".
             "<option value=\"id\">ID</option>".
             "<option value=\"bname\">BOOK NAME</option>".
             "<option value=\"cname\">COUNTRY NAME</option>".
             "<option value=\"sname\">NAME SEPARATE</option>".
             "<option value=\"name\">NAME</option>".
             "<option value=\"adress\">ADRESS</option>".
             "<option value=\"class\">CLASS</option>".
             "<option value=\"inumb\">INT NUMB</option>".
             "<option value=\"tnumb\">TEL NUMB</option>".
             "<option value=\"fnumb\">FLOAT NUMB rel</option>".
             "<option value=\"bool\">BOOL</option>".
             "<option value=\"date\">DATE</option>".
             "</datalist></th>";

        }echo "</tr>";

    echo "<tr><th>Oszlopok neve:</th>";

    for($i = 1; $i <= $n; $i++)
    {
        #$it = $i / 2 + 0.5;
        echo "<th><input name=\"gen_key-name".$i."\"></th>";

    }echo "</tr>";

    echo "<input type=\"hidden\" name=\"colnumb\" value=\"".$n."\">";

    echo "<tr><th colspan=\"1\"><input type=\"submit\"></tr></th>";
?>
</table>
</form>
</body>
</html>