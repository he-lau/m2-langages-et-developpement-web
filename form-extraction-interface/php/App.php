<?php 


class App {

    // url pour recuperer les données
    private $csv_url;
    private $datas;


    // convertir les données CSV en tableau 
    public function csvToArray() {
        $datas = file_get_contents($this->csv_url);

        $rows = explode("\n",$datas);
        $s = array();
        foreach($rows as $row) {
            $s[] = str_getcsv($row);
        }

        $this->datas=$s;

        return $s;

    }

    // getters
    public function debug($var) {
        echo "<pre>";
        var_dump($var);
        echo "</pre>";
    }    

    public function transformGoogleDriveUrl($originalUrl) {
    // Recherche de la chaîne "/open?id=" dans l'URL d'origine
    $position = strpos($originalUrl, "/open?id=");
    
    // Si la chaîne est trouvée
    if ($position !== false) {
        // Récupérer l'ID du fichier en supprimant la partie avant "/open?id="
        $fileId = substr($originalUrl, $position + strlen("/open?id="));
        
        // Construire l'URL directe avec "https://drive.google.com/uc?id="
        return "https://drive.google.com/uc?id=" . $fileId;
    }
    
    // Si l'URL ne contient pas "/open?id=", la retourner telle quelle
    return $originalUrl;
    }


    // setters
    public function setCsvUrl($new_url) {
        $this->csv_url = $new_url;
    }

    // getters
    public function getCsvUrl() {
        return $this->csv_url;
    }
    public function getDatas() {
        return $this->datas;
    }





}

?>