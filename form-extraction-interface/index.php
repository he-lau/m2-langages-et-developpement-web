<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 

    require_once "./php/App.php";

    //
    $app = new App();

    //
    $app->setCsvUrl("https://docs.google.com/spreadsheets/d/e/2PACX-1vRzXta9_LQaIzTnhA8SN7DFowiCd3Qpj6_TNA2_Z-476ejofbRnSFqyKUBGaslB1inWZKkErTrSeITh/pub?gid=175369936&single=true&output=csv");

    //
    /*
    echo "<pre>";
    echo $app->getCsvUrl();
    echo "</pre>";
    */

    //
    /*
    echo "<pre>";
    var_dump($app->csvToArray());
    echo "</pre>";
    */


    $csv_array = $app->csvToArray();

    
    ?>
    
</body>
</html>