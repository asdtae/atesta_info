<?php
    $n = $_POST["colnumb"];
    $table_name = $_POST["table_name"];

    //echo $table_name."<br>";

    //for($i = 1; $i <= $n; $i++)
    {
        #$gk = $_POST["gen_key".$i];
        #$gkn = $_POST["gen_key-name".$i];
        //echo $gk." ".$gkn."<br>";
    }

    $start_i = $_POST["loops"];
    $numb_of_it = $_POST["loope"];

    srand(time());

    $numb_of_it -= $start_i;

    for ($i = $start_i; $i <= $numb_of_it; $i++) {
        // [Anyaszam]
        $anya_szam = $i;

        // [Nev]
        $firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Katie"];
        $lastNames = ["Smith", "Doe", "Brown", "Johnson", "Williams", "Jones"];
        $firstName = getRandomName($firstNames);
        $lastName = getRandomName($lastNames);

        // [Cim]
        $varosok = ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pecs", "Gyor"];
        $utcak = ["Andrassy Ut", "Kossuth Lajos Utca", "Vaci Utca", "Rakoczi Ut", "Margit Korter", "Fo Utca"];
        $utszam = rand(1, 2500);
        $Svarosok = getRandomName($varosok);
        $Sutcak = getRandomName($utcak);
        $cim = $Svarosok . ' ' . $Sutcak . ' ' . $utszam;

        // [Osztaly]
        $osztaly = 'A' . rand(1, 7);

        // [Evfoly]
        $num = rand(4, 15);
        $evfoly = ($num < 12) ? (string)$num : "12";

        // [Atlag]
        $LO = 1;
        $HI = 11;
        $r3 = rand($LO, $HI);
        $jegy1 = min($r3, 10);

        $r3 = rand($LO, $HI);
        $jegy2 = min($r3, 10);

        $r3 = rand($LO, $HI);
        $jegy3 = min($r3, 10);

        $r3 = rand($LO, $HI);
        $jegy4 = min($r3, 10);

        $atlag = ($jegy1 + $jegy2 + $jegy3 + $jegy4) / 4;

        $jelzo = (rand(0, 1) == 1) ? true : false;

        echo "INSERT INTO `".$table_name."`(`anyakonyv_sz`, `vezeteknev`, `keresztnev`, `cim`, `osztaly`, `atlag`, `jelzo`) VALUES ("
            . "'" . $anya_szam . "' ,"
            . "'" . $lastName . "' ,"
            . "'" . $firstName . "' ,"
            . "'" . $cim . "' ,"
            . "'" . $evfoly . $osztaly . "' ,"
            . "'" . $atlag . "' ,"
            . "'" . ($jelzo ? '1' : '0') . "');"
            . "<br>";

}

function getRandomName($names) {
    return $names[array_rand($names)];
}
