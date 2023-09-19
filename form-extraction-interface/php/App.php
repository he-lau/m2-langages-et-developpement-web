<?php 


class App {

    // url pour recuperer les données
    private $csv_url;



    // 
    public function csvToArray() {
        $data = file_get_contents($this->csv_url);

        $rows = explode("\n",$data);
        $s = array();
        foreach($rows as $row) {
            $s[] = str_getcsv($row);
        }

        return $s;

    }

    //
    public function render() {






    }


    // setters
    public function setCsvUrl($new_url) {
        $this->csv_url = $new_url;
    }

    // getters
    public function getCsvUrl() {
        return $this->csv_url;
    }






}

?>