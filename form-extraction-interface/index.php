<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php 
        require_once "init.php";
    ?>
    <meta name="referrer" content="no-referrer" />


</head>
<body>
    <?php 

    require_once "./php/App.php";

    //
    $app = new App();

    //
    $app->setCsvUrl("https://docs.google.com/spreadsheets/d/e/2PACX-1vS6VwtY1UmsEVtVwGX0KX2iQcbiMZo5kms3hsHRizsZSGuuWG9G9HD5FjCRJG2JMOYpiaVVuTNLu2zK/pub?gid=178537300&single=true&output=csv");


    $app->debug($app->csvToArray());



    $app->csvToArray();
    $datas = $app->getDatas();
    $app->debug($datas);

    ?>

<div class="container">
  <div class="row ">
  <!--
  <img class="card-img-top" src="https://drive.google.com/file/d/10ys7QsvzAZA_6zj60WPBmbQnqjYc7ZGo" alt="Card image cap" referrerpolicy="no-referrer" />
  <img class="card-img-top" src="https://drive.google.com/uc?id=10ys7QsvzAZA_6zj60WPBmbQnqjYc7ZGo" alt="Card image cap" />
 -->



<?php


// parcourrir ensemble des données
for ($i = 1; $i < count($datas); $i++) {
    echo "<div class=\"col-lg-4 col-md-12\">";
echo "<div class=\"card\" style=\"width: 18rem;\">";
    echo '<div class="user-chart">';
    echo "<div class=\"card-header\">";
    echo "<h1>". $datas[$i][1] ."</h1>";
    echo "</div>";
    echo "<img class=\"card-img-top\" src=\"".$app->transformGoogleDriveUrl($datas[$i][2])."\" alt=\"Card image cap\">";
    echo "<div class=\"card-body\">";
    echo "</div>";
    // Use a unique identifier for each canvas
    echo '<canvas class="radar-chart" id="radar-chart-' . $i . '" width="400" height="400"></canvas>';
    echo '</div>';
    ?>
    <script>
        var ctx = document.getElementById("radar-chart-<?php echo $i; ?>").getContext("2d");
        var data = {
            labels: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP"],
            datasets: [
                {
                    label: "Skill Levels",
                    data: [
                        <?php echo $datas[$i][3]; ?>, 
                        <?php echo $datas[$i][4]; ?>, 
                        <?php echo $datas[$i][5]; ?>, 
                        <?php echo $datas[$i][6]; ?>, 
                        <?php echo $datas[$i][7]; ?>
                    ],
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2
                }
            ]
        };
        var options = {
            scale: {
                ticks: {
                    beginAtZero: true,
                    stepSize: 1, // Set the step size to 1 to show labels 0, 1, 2, 3, 4, 5
                    min: 0,
                    max: 5 // Assuming skill levels are on a scale from 0 to 5
                }
            }
        };
        var radarChart = new Chart(ctx, {
            type: "radar",
            data: data,
            options: options
        });
    </script>
    <?php
    echo "</div>";
    echo "</div>";
}

?>


</div>
</div>
</body>


</html>

